import sanitizeHtml from "sanitize-html";
export const emailRegex =
  process.env.NODE_ENV === "production"
    ? /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[\w.]*gov\.sg$/
    : /.*/;

export const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
export const otpRegex = /^\d{6}$/;

export function sanitize(html) {
  return sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "u", // Allow underlined content
      "img", // Allow img tags
      "span" // Allow span tags
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      iframe: ["src"], // Allow videos
      span: ["style"] // Allow text/background color
    },
    allowedIframeHostnames: ["www.youtube.com", "player.vimeo.com"]
  });
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
