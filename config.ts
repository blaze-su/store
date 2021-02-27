import rc from "rc";

export const config = rc("JWT", {
    port: process.env.PORT || 3000,
    connection: "./data",
    secret: "VERYSECRETKEY",
    storageAccountName: process.env.STORAGE_ACCOUNT_NAME || "stagronesisdev",
    storageAccountKey:
        process.env.STORAG_ACCOUNT_KEY ||
        "gYxqZAkUwB3xHJO8h83dt4t0Fj/FeyGs3LPVCCJiEV52RQhzGC3l7GkpMaQTfnK0nu2QuROqgpRwUKYBfwtwhQ==",
});
