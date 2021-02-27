import { blobServiceClient } from "../src/helpers/initStorage";
import { readFile } from "fs/promises";
import path from "path";

const TEST_CONTAINER_NAME = "test-container";

describe("file", () => {
    test("test", async () => {
        const iter = blobServiceClient.listContainers();

        let i = 0;
        for await (const container of iter) {
            console.log(`Container ${i++}: ${container.name}`);
        }

        expect(1).toBe(1);
    });

    test("Create container", async () => {
        const containerClient = blobServiceClient.getContainerClient(
            TEST_CONTAINER_NAME
        );
        const createContainerResponse = await containerClient.createIfNotExists();

        expect(
            typeof createContainerResponse.requestId === "string"
        ).toBeTruthy();
    });

    test("Save file to the container", async () => {
        const fileName = "test.pdf";
        const filePath = path.join(__dirname, fileName); //?

        const containerClient = blobServiceClient.getContainerClient(
            TEST_CONTAINER_NAME
        );
        // const exist = await containerClient.exists();
        // if (!exist) await containerClient.create();
        await containerClient.createIfNotExists();

        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
        console.log(
            `Upload block blob ${fileName} successfully`,
            uploadBlobResponse.requestId
        );

        const listBlobs = containerClient.listBlobsFlat();
        for await (const blob of listBlobs) {
            console.log(blob.name); //?
        }

        return containerClient.delete();
    });

    test("Delete test containers", async () => {
        const listContainers = blobServiceClient.listContainers();

        for await (const container of listContainers) {
            if (container.name.includes("test")) {
                //blobServiceClient.deleteContainer(container.name);
            }
        }
    });
});
