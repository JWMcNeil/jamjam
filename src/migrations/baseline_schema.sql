CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."enum__projects_v_version_lifecycle" AS ENUM('live', 'in-progress', 'archived');--> statement-breakpoint
CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."enum__projects_v_version_type" AS ENUM('demo', 'client', 'experiment', 'personal');--> statement-breakpoint
CREATE TYPE "public"."enum_forms_blocks_chips_options_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');--> statement-breakpoint
CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');--> statement-breakpoint
CREATE TYPE "public"."enum_header_nav_items_link_appearance" AS ENUM('default', 'outline', 'secondary', 'miniOutline', 'link');--> statement-breakpoint
CREATE TYPE "public"."enum_header_nav_items_link_size" AS ENUM('default');--> statement-breakpoint
CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum_mux_video_playback_options_playback_policy" AS ENUM('signed', 'public');--> statement-breakpoint
CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');--> statement-breakpoint
CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');--> statement-breakpoint
CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');--> statement-breakpoint
CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."enum_projects_lifecycle" AS ENUM('live', 'in-progress', 'archived');--> statement-breakpoint
CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."enum_projects_type" AS ENUM('demo', 'client', 'experiment', 'personal');--> statement-breakpoint
CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');--> statement-breakpoint
CREATE TYPE "public"."enum_tags_colour" AS ENUM('nextjs', 'webdev', 'ai', 'webflow', 'js', 'design', 'opinion', 'tools', 'experiment', 'freelance', 'ux', 'career', 'tutorial', 'wordpress');--> statement-breakpoint
CREATE TABLE "_posts_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_excerpt" varchar,
	"version_hero_image_id" integer,
	"version_content" jsonb,
	"version_meta_title" varchar,
	"version_meta_image_id" integer,
	"version_meta_description" varchar,
	"version_read_time" numeric,
	"version_published_at" timestamp(3) with time zone,
	"version_generate_slug" boolean DEFAULT true,
	"version_slug" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean,
	"autosave" boolean
);
--> statement-breakpoint
CREATE TABLE "_posts_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"posts_id" integer,
	"tags_id" integer,
	"users_id" integer
);
--> statement-breakpoint
CREATE TABLE "_posts_v_version_populated_authors" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "_projects_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_excerpt" varchar,
	"version_type" "enum__projects_v_version_type",
	"version_lifecycle" "enum__projects_v_version_lifecycle" DEFAULT 'live',
	"version_year" numeric,
	"version_hero_image_id" integer,
	"version_description" jsonb,
	"version_live_url" varchar,
	"version_code_url" varchar,
	"version_meta_title" varchar,
	"version_meta_image_id" integer,
	"version_meta_description" varchar,
	"version_featured" boolean DEFAULT false,
	"version_order" numeric,
	"version_generate_slug" boolean DEFAULT true,
	"version_slug" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean,
	"autosave" boolean
);
--> statement-breakpoint
CREATE TABLE "_projects_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" integer
);
--> statement-breakpoint
CREATE TABLE "_projects_v_version_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "_projects_v_version_tech_stack" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"role" varchar,
	"_uuid" varchar
);
--> statement-breakpoint
CREATE TABLE "footer" (
	"id" serial PRIMARY KEY NOT NULL,
	"github_url" varchar,
	"linkedin_url" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "form_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"form_id" integer NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_submissions_submission_data" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"field" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forms" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"submit_button_label" varchar,
	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
	"confirmation_message" jsonb,
	"redirect_url" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_checkbox" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"default_value" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_chips" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_chips_options" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"icon" "enum_forms_blocks_chips_options_icon" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_country" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_email" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_message" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"message" jsonb,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_number" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" numeric,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_select" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"placeholder" varchar,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_select_options" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_state" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_text" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_blocks_textarea" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"label" varchar,
	"width" numeric,
	"default_value" varchar,
	"required" boolean,
	"block_name" varchar
);
--> statement-breakpoint
CREATE TABLE "forms_emails" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"email_to" varchar,
	"cc" varchar,
	"bcc" varchar,
	"reply_to" varchar,
	"email_from" varchar,
	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
	"message" jsonb
);
--> statement-breakpoint
CREATE TABLE "header" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "header_nav_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
	"link_new_tab" boolean,
	"link_url" varchar,
	"link_label" varchar,
	"link_appearance" "enum_header_nav_items_link_appearance" DEFAULT 'default',
	"link_size" "enum_header_nav_items_link_size" DEFAULT 'default'
);
--> statement-breakpoint
CREATE TABLE "header_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"posts_id" integer,
	"projects_id" integer
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar,
	"caption" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric,
	"sizes_thumbnail_url" varchar,
	"sizes_thumbnail_width" numeric,
	"sizes_thumbnail_height" numeric,
	"sizes_thumbnail_mime_type" varchar,
	"sizes_thumbnail_filesize" numeric,
	"sizes_thumbnail_filename" varchar,
	"sizes_square_url" varchar,
	"sizes_square_width" numeric,
	"sizes_square_height" numeric,
	"sizes_square_mime_type" varchar,
	"sizes_square_filesize" numeric,
	"sizes_square_filename" varchar,
	"sizes_small_url" varchar,
	"sizes_small_width" numeric,
	"sizes_small_height" numeric,
	"sizes_small_mime_type" varchar,
	"sizes_small_filesize" numeric,
	"sizes_small_filename" varchar,
	"sizes_medium_url" varchar,
	"sizes_medium_width" numeric,
	"sizes_medium_height" numeric,
	"sizes_medium_mime_type" varchar,
	"sizes_medium_filesize" numeric,
	"sizes_medium_filename" varchar,
	"sizes_large_url" varchar,
	"sizes_large_width" numeric,
	"sizes_large_height" numeric,
	"sizes_large_mime_type" varchar,
	"sizes_large_filesize" numeric,
	"sizes_large_filename" varchar,
	"sizes_xlarge_url" varchar,
	"sizes_xlarge_width" numeric,
	"sizes_xlarge_height" numeric,
	"sizes_xlarge_mime_type" varchar,
	"sizes_xlarge_filesize" numeric,
	"sizes_xlarge_filename" varchar,
	"sizes_og_url" varchar,
	"sizes_og_width" numeric,
	"sizes_og_height" numeric,
	"sizes_og_mime_type" varchar,
	"sizes_og_filesize" numeric,
	"sizes_og_filename" varchar
);
--> statement-breakpoint
CREATE TABLE "mux_video" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"asset_id" varchar,
	"duration" numeric,
	"poster_timestamp" numeric,
	"aspect_ratio" varchar,
	"max_width" numeric,
	"max_height" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mux_video_playback_options" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"playback_id" varchar,
	"playback_policy" "enum_mux_video_playback_options_playback_policy"
);
--> statement-breakpoint
CREATE TABLE "payload_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"input" jsonb,
	"completed_at" timestamp(3) with time zone,
	"total_tried" numeric DEFAULT 0,
	"has_error" boolean DEFAULT false,
	"error" jsonb,
	"task_slug" "enum_payload_jobs_task_slug",
	"queue" varchar DEFAULT 'default',
	"wait_until" timestamp(3) with time zone,
	"processing" boolean DEFAULT false,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_jobs_log" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"executed_at" timestamp(3) with time zone NOT NULL,
	"completed_at" timestamp(3) with time zone NOT NULL,
	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
	"task_i_d" varchar NOT NULL,
	"input" jsonb,
	"output" jsonb,
	"state" "enum_payload_jobs_log_state" NOT NULL,
	"error" jsonb
);
--> statement-breakpoint
CREATE TABLE "payload_kv" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"global_slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer,
	"media_id" integer,
	"tags_id" integer,
	"posts_id" integer,
	"projects_id" integer,
	"mux_video_id" integer,
	"redirects_id" integer,
	"forms_id" integer,
	"form_submissions_id" integer,
	"search_id" integer
);
--> statement-breakpoint
CREATE TABLE "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"excerpt" varchar,
	"hero_image_id" integer,
	"content" jsonb,
	"meta_title" varchar,
	"meta_image_id" integer,
	"meta_description" varchar,
	"read_time" numeric,
	"published_at" timestamp(3) with time zone,
	"generate_slug" boolean DEFAULT true,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_posts_status" DEFAULT 'draft'
);
--> statement-breakpoint
CREATE TABLE "posts_populated_authors" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE "posts_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"posts_id" integer,
	"tags_id" integer,
	"users_id" integer
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"excerpt" varchar,
	"type" "enum_projects_type",
	"lifecycle" "enum_projects_lifecycle" DEFAULT 'live',
	"year" numeric,
	"hero_image_id" integer,
	"description" jsonb,
	"live_url" varchar,
	"code_url" varchar,
	"meta_title" varchar,
	"meta_image_id" integer,
	"meta_description" varchar,
	"featured" boolean DEFAULT false,
	"order" numeric,
	"generate_slug" boolean DEFAULT true,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_projects_status" DEFAULT 'draft'
);
--> statement-breakpoint
CREATE TABLE "projects_gallery" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer
);
--> statement-breakpoint
CREATE TABLE "projects_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" integer
);
--> statement-breakpoint
CREATE TABLE "projects_tech_stack" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar,
	"role" varchar
);
--> statement-breakpoint
CREATE TABLE "redirects" (
	"id" serial PRIMARY KEY NOT NULL,
	"from" varchar NOT NULL,
	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
	"to_url" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "redirects_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"posts_id" integer,
	"projects_id" integer
);
--> statement-breakpoint
CREATE TABLE "search" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"priority" numeric,
	"slug" varchar,
	"meta_title" varchar,
	"meta_description" varchar,
	"meta_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "search_categories" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"relation_to" varchar,
	"category_i_d" varchar,
	"title" varchar
);
--> statement-breakpoint
CREATE TABLE "search_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"posts_id" integer,
	"projects_id" integer
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar DEFAULT 'Jamie McNeil' NOT NULL,
	"status_text" varchar DEFAULT 'available for work' NOT NULL,
	"status_note" varchar,
	"email" varchar DEFAULT 'jamie@jamjam.dev' NOT NULL,
	"location" varchar DEFAULT 'Melbourne, Australia' NOT NULL,
	"footer_note" varchar,
	"about_section_label" varchar DEFAULT '// about' NOT NULL,
	"about_headline" varchar DEFAULT 'Full-stack developer based in Melbourne.' NOT NULL,
	"about_bio" varchar DEFAULT 'I build websites, web apps, and AI-powered tools. Comfortable across the stack — from design systems to deployment. Currently looking for my next role.' NOT NULL,
	"about_photo_id" integer NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"colour" "enum_tags_colour" NOT NULL,
	"generate_slug" boolean DEFAULT true,
	"slug" varchar NOT NULL,
	"parent_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags_breadcrumbs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"doc_id" integer,
	"url" varchar,
	"label" varchar
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric DEFAULT 0,
	"lock_until" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "_projects_v_version_tech_stack" ADD CONSTRAINT "_projects_v_version_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_chips" ADD CONSTRAINT "forms_blocks_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_chips_options" ADD CONSTRAINT "forms_blocks_chips_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mux_video_playback_options" ADD CONSTRAINT "mux_video_playback_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mux_video"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mux_video_fk" FOREIGN KEY ("mux_video_id") REFERENCES "public"."mux_video"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects_tech_stack" ADD CONSTRAINT "projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_about_photo_id_media_id_fk" FOREIGN KEY ("about_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_parent_id_tags_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags_breadcrumbs" ADD CONSTRAINT "tags_breadcrumbs_doc_id_tags_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags_breadcrumbs" ADD CONSTRAINT "tags_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");--> statement-breakpoint
CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");--> statement-breakpoint
CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");--> statement-breakpoint
CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");--> statement-breakpoint
CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");--> statement-breakpoint
CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");--> statement-breakpoint
CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");--> statement-breakpoint
CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");--> statement-breakpoint
CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");--> statement-breakpoint
CREATE INDEX "_posts_v_rels_tags_id_idx" ON "_posts_v_rels" USING btree ("tags_id");--> statement-breakpoint
CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");--> statement-breakpoint
CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "_projects_v_version_version_hero_image_idx" ON "_projects_v" USING btree ("version_hero_image_id");--> statement-breakpoint
CREATE INDEX "_projects_v_version_meta_version_meta_image_idx" ON "_projects_v" USING btree ("version_meta_image_id");--> statement-breakpoint
CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");--> statement-breakpoint
CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");--> statement-breakpoint
CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");--> statement-breakpoint
CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");--> statement-breakpoint
CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");--> statement-breakpoint
CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");--> statement-breakpoint
CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "_projects_v_rels_tags_id_idx" ON "_projects_v_rels" USING btree ("tags_id");--> statement-breakpoint
CREATE INDEX "_projects_v_version_gallery_order_idx" ON "_projects_v_version_gallery" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_projects_v_version_gallery_parent_id_idx" ON "_projects_v_version_gallery" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "_projects_v_version_gallery_image_idx" ON "_projects_v_version_gallery" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX "_projects_v_version_tech_stack_order_idx" ON "_projects_v_version_tech_stack" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "_projects_v_version_tech_stack_parent_id_idx" ON "_projects_v_version_tech_stack" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");--> statement-breakpoint
CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_chips_order_idx" ON "forms_blocks_chips" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_chips_parent_id_idx" ON "forms_blocks_chips" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_chips_path_idx" ON "forms_blocks_chips" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_chips_options_order_idx" ON "forms_blocks_chips_options" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_chips_options_parent_id_idx" ON "forms_blocks_chips_options" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");--> statement-breakpoint
CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");--> statement-breakpoint
CREATE INDEX "header_rels_projects_id_idx" ON "header_rels" USING btree ("projects_id");--> statement-breakpoint
CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");--> statement-breakpoint
CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");--> statement-breakpoint
CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");--> statement-breakpoint
CREATE UNIQUE INDEX "mux_video_title_idx" ON "mux_video" USING btree ("title");--> statement-breakpoint
CREATE INDEX "mux_video_updated_at_idx" ON "mux_video" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "mux_video_created_at_idx" ON "mux_video" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "mux_video_playback_options_order_idx" ON "mux_video_playback_options" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "mux_video_playback_options_parent_id_idx" ON "mux_video_playback_options" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");--> statement-breakpoint
CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");--> statement-breakpoint
CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");--> statement-breakpoint
CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");--> statement-breakpoint
CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");--> statement-breakpoint
CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");--> statement-breakpoint
CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");--> statement-breakpoint
CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_mux_video_id_idx" ON "payload_locked_documents_rels" USING btree ("mux_video_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");--> statement-breakpoint
CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");--> statement-breakpoint
CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");--> statement-breakpoint
CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");--> statement-breakpoint
CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");--> statement-breakpoint
CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");--> statement-breakpoint
CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");--> statement-breakpoint
CREATE INDEX "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");--> statement-breakpoint
CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");--> statement-breakpoint
CREATE INDEX "projects_hero_image_idx" ON "projects" USING btree ("hero_image_id");--> statement-breakpoint
CREATE INDEX "projects_meta_meta_image_idx" ON "projects" USING btree ("meta_image_id");--> statement-breakpoint
CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");--> statement-breakpoint
CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "projects_gallery_image_idx" ON "projects_gallery" USING btree ("image_id");--> statement-breakpoint
CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "projects_rels_tags_id_idx" ON "projects_rels" USING btree ("tags_id");--> statement-breakpoint
CREATE INDEX "projects_tech_stack_order_idx" ON "projects_tech_stack" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "projects_tech_stack_parent_id_idx" ON "projects_tech_stack" USING btree ("_parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");--> statement-breakpoint
CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");--> statement-breakpoint
CREATE INDEX "redirects_rels_projects_id_idx" ON "redirects_rels" USING btree ("projects_id");--> statement-breakpoint
CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");--> statement-breakpoint
CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");--> statement-breakpoint
CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");--> statement-breakpoint
CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");--> statement-breakpoint
CREATE INDEX "search_rels_projects_id_idx" ON "search_rels" USING btree ("projects_id");--> statement-breakpoint
CREATE INDEX "site_settings_about_photo_idx" ON "site_settings" USING btree ("about_photo_id");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "tags_parent_idx" ON "tags" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "tags_breadcrumbs_order_idx" ON "tags_breadcrumbs" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "tags_breadcrumbs_parent_id_idx" ON "tags_breadcrumbs" USING btree ("_parent_id");--> statement-breakpoint
CREATE INDEX "tags_breadcrumbs_doc_idx" ON "tags_breadcrumbs" USING btree ("doc_id");--> statement-breakpoint
CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");--> statement-breakpoint
CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");