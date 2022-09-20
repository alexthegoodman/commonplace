-- CreateTable
CREATE TABLE "PageView" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "city" TEXT,
    "geoData" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageView_id_key" ON "PageView"("id");
