import {
    BlobServiceClient,
    StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { config } from "../../config";

const { storageAccountName: account, storageAccountKey: accountKey } = config;

const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
);

export { blobServiceClient };
