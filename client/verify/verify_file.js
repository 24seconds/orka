const crypto = require("crypto");
const fs = require("fs");

function generateHash(filename) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(filename);
        const hash = crypto.createHash("sha256");

        // Listen for data
        readStream.on("data", (chunk) => {
            hash.update(chunk);
        });

        // File is done being read
        readStream.on("close", () => {
            resolve(hash.digest("hex"));
        });
    });
}

async function compareHash() {
    const filename1 = process.argv[2];
    const filename2 = process.argv[3];

    const hash1 = await generateHash(filename1);
    const hash2 = await generateHash(filename2);

    console.log("\n==================");

    console.log(`[${filename1}]: ${hash1}`);
    console.log(`[${filename2}]: ${hash2}`);
    console.log(`hashes are ${hash1 === hash2 ? "same" : "not same"}`);

    console.log("==================\n");
}

compareHash();
