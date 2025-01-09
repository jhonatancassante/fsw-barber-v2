import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Example Test", () => {
    it("should pass this test", async () => {
        const users = await prisma.user.findMany();
        expect(users).toBeDefined();
    });
});
