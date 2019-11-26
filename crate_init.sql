CREATE TABLE IF NOT EXISTS "voxsnap"."narrations" (
   "audio_length" STRING,
   "audio_url" STRING,
   "blog_url" STRING,
   "content" STRING INDEX USING FULLTEXT WITH (
      analyzer = 'english'
   ),
   "created" STRING,
   "customer_id" INTEGER,
   "description" STRING,
   "expiry_date" STRING,
   "featured_image" STRING,
   "gen_description" BOOLEAN,
   "id" INTEGER,
   "in_sitemap" BOOLEAN,
   "keywords_string" STRING,
   "meta_title" STRING,
   "narrator_id" INTEGER,
   "notes" STRING,
   "preferred_gender" STRING,
   "public_library" BOOLEAN,
   "publish_date" STRING,
   "short_url" STRING,
   "site_id" INTEGER,
   "slug" STRING,
   "status" INTEGER,
   "title" STRING,
   "updated" STRING,
   "uuid" STRING
)
CLUSTERED INTO 4 SHARDS;

CREATE TABLE IF NOT EXISTS "voxsnap"."customers" (
   "id" INTEGER,
   "short_name" STRING
)
CLUSTERED INTO 4 SHARDS;

CREATE TABLE IF NOT EXISTS "voxsnap"."errors" (
   "browser" STRING,
   "build_num" INTEGER,
   "device" STRING,
   "event_time" TIMESTAMP,
   "fatal" BOOLEAN,
   "ip_addr" IP,
   "location_city" STRING,
   "location_country" STRING,
   "location_state" STRING,
   "message" STRING INDEX OFF STORAGE WITH (
      columnstore = false
   ),
   "os" STRING,
   "pin" ARRAY(FLOAT),
   "referrer" STRING,
   "user-agent" STRING
)
CLUSTERED INTO 4 SHARDS;

CREATE TABLE IF NOT EXISTS "voxsnap"."countries" (
   "alpha_2" STRING,
   "alpha_3" STRING,
   "name" STRING,
   "numeric" STRING,
   "official_name" STRING
)
CLUSTERED INTO 4 SHARDS;

CREATE TABLE IF NOT EXISTS "voxsnap"."events_2019" (
   "audio_time" FLOAT,
   "browser" STRING,
   "build_num" INTEGER,
   "customer" STRING,
   "customer_id" INTEGER,
   "delta_time" LONG,
   "device" STRING,
   "event_name" STRING,
   "event_time" TIMESTAMP,
   "event_type" STRING,
   "ip_addr" IP,
   "library_genre" STRING,
   "library_type" STRING,
   "location" GEO_POINT,
   "location_city" STRING,
   "location_country" STRING,
   "location_state" STRING,
   "narration" INTEGER,
   "os" STRING,
   "pin" ARRAY(FLOAT),
   "play_ranges" ARRAY(FLOAT),
   "playlist" INTEGER,
   "referrer" STRING,
   "seek_from" FLOAT,
   "session_id" STRING,
   "share_type" STRING,
   "tot_play_time" INTEGER,
   "user_id" STRING
)
CLUSTERED INTO 4 SHARDS;

CREATE TABLE IF NOT EXISTS "voxsnap"."events_session_2019" (
   "audio_time" FLOAT,
   "browser" STRING,
   "build_num" INTEGER,
   "customer" STRING,
   "customer_id" INTEGER,
   "delta_time" LONG,
   "device" STRING,
   "event_time" TIMESTAMP,
   "event_type" STRING,
   "ip_addr" IP,
   "library_genre" STRING,
   "library_type" STRING,
   "location" GEO_POINT,
   "location_city" STRING,
   "location_country" STRING,
   "location_state" STRING,
   "narration" INTEGER,
   "os" STRING,
   "pin" ARRAY(FLOAT),
   "play_ranges" ARRAY(FLOAT),
   "playlist" INTEGER,
   "referrer" STRING,
   "session_id" STRING,
   "tot_play_time" INTEGER,
   "user_id" STRING
)
CLUSTERED INTO 4 SHARDS;

CREATE TABLE IF NOT EXISTS "voxsnap"."events_timeupdate_2019" (
   "audio_time" FLOAT,
   "browser" STRING,
   "build_num" INTEGER,
   "customer" STRING,
   "customer_id" INTEGER,
   "delta_time" LONG,
   "device" STRING,
   "event_time" TIMESTAMP,
   "event_type" STRING,
   "ip_addr" IP,
   "library_genre" STRING,
   "library_type" STRING,
   "location" GEO_POINT,
   "location_city" STRING,
   "location_country" STRING,
   "location_state" STRING,
   "narration" INTEGER,
   "os" STRING,
   "pin" ARRAY(FLOAT),
   "play_pct" FLOAT,
   "play_ranges" ARRAY(FLOAT),
   "playlist" INTEGER,
   "referrer" STRING,
   "session_id" STRING,
   "tot_play_time" INTEGER,
   "user_id" STRING
)
CLUSTERED INTO 4 SHARDS;
