-- CreateTable
CREATE TABLE "songs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "createdBy" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlists" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songonplaylist" (
    "id" SERIAL NOT NULL,
    "id_playlist" INTEGER NOT NULL,
    "id_song" INTEGER NOT NULL,

    CONSTRAINT "songonplaylist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "songonplaylist" ADD CONSTRAINT "songonplaylist_id_playlist_fkey" FOREIGN KEY ("id_playlist") REFERENCES "playlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songonplaylist" ADD CONSTRAINT "songonplaylist_id_song_fkey" FOREIGN KEY ("id_song") REFERENCES "songs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
