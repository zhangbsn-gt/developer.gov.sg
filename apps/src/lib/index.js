export const emailRegex =
    process.env.NODE_ENV === "production"
        ? /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[\w\.]*gov\.sg$/
        : /.*/;

export const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;