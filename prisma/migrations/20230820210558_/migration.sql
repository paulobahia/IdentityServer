/*
  Warnings:

  - You are about to drop the column `create_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "gender" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "restaurantId" TEXT NOT NULL,
    CONSTRAINT "User_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("birthDate", "email", "gender", "id", "name", "password", "restaurantId", "role") SELECT "birthDate", "email", "gender", "id", "name", "password", "restaurantId", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Restaurant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Restaurant" ("id", "name") SELECT "id", "name" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
