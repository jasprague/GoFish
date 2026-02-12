-- Rename "User" table to "BetaSignup" to preserve beta signups
ALTER TABLE "User" RENAME TO "BetaSignup";

-- Rename the unique index to match the new table name
ALTER INDEX "User_email_key" RENAME TO "BetaSignup_email_key";
ALTER INDEX "User_pkey" RENAME TO "BetaSignup_pkey";

-- Create Profile table for authenticated users (linked to Supabase auth.users)
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- Create unique index on Profile email
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
