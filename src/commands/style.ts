import { BotContext } from "../types";
import { STYLES, makeStylish } from "../utils/format";
import { InlineKeyboard } from "grammy";

const ITEMS_PER_PAGE = 10;

export async function onStyle(c: BotContext) {
    const args = c.match as string;
    
    if (!args || !args.trim()) {
        return c.reply("Usage: <code>/style Hello World</code>", { parse_mode: "HTML" });
    }

    await sendStylePage(c, args.trim(), 0);
}

export async function onStyleCallback(c: BotContext) {
    if (!c.callbackQuery || !c.callbackQuery.data) return;
    
    // Format: style_page_<pageIndex>
    const parts = c.callbackQuery.data.split("_");
    const pageIndex = parseInt(parts[2]);
    
    // Attempt to recover text from the message header
    // Header format: "🎨 Styles for: "TEXT""
    const messageText = c.callbackQuery.message?.text || "";
    // Regex to match the text inside quotes after "Styles for: "
    const match = messageText.match(/Styles for: "(.*)"/s); 
    
    if (!match || !match[1]) {
        await c.answerCallbackQuery({ text: "❌ Session expired or text not found." });
        return;
    }
    
    const originalText = match[1];
    
    await c.answerCallbackQuery();
    await sendStylePage(c, originalText, pageIndex, c.callbackQuery.message?.message_id);
}

async function sendStylePage(c: BotContext, text: string, page: number, messageIdToEdit?: number) {
    const styleNames = Object.keys(STYLES);
    const totalPages = Math.ceil(styleNames.length / ITEMS_PER_PAGE);
    
    // Bounds check
    if (page < 0) page = 0;
    if (page >= totalPages) page = totalPages - 1;

    // Slice styles for current page
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const currentStyles = styleNames.slice(start, end);
    
    let response = `🎨 Styles for: "${text}"\n`;
    response += `📄 <b>Page ${page + 1}/${totalPages}</b>\n\n`;
    
    currentStyles.forEach(style => {
        response += `<b>${style}:</b>\n`;
        // Escape HTML tags in the styled output to prevent breaking parse_mode
        const styled = makeStylish(text, style)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        response += `<code>${styled}</code>\n\n`;
    });

    const keyboard = new InlineKeyboard();
    
    // Navigation Buttons
    if (page > 0) {
        keyboard.text("⬅️ Back", `style_page_${page - 1}`);
    }
    if (page < totalPages - 1) {
        keyboard.text("Next ➡️", `style_page_${page + 1}`);
    }

    try {
        if (messageIdToEdit) {
            await c.api.editMessageText(c.chat!.id, messageIdToEdit, response, {
                parse_mode: "HTML",
                reply_markup: keyboard
            });
        } else {
            await c.reply(response, {
                parse_mode: "HTML",
                reply_markup: keyboard
            });
        }
    } catch (e) {
        // Ignore "Message is not modified" errors
    }
}
