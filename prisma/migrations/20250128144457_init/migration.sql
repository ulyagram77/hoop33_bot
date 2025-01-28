-- CreateTable
CREATE TABLE "Players" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "telegramId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Players_telegramId_key" ON "Players"("telegramId");
