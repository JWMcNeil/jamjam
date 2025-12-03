import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline', 'secondary', 'miniOutline', 'link', 'white');
  CREATE TYPE "public"."enum_pages_hero_links_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_hero_draggable_cards_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_content_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum_pages_blocks_content_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_tech_stack_canvas_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum_pages_blocks_tech_stack_canvas_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_tech_stack_canvas_container_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum_pages_blocks_video_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum_pages_blocks_video_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_video_player_video_type" AS ENUM('mux', 'external');
  CREATE TYPE "public"."enum_pages_blocks_draggable_cards_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum_pages_blocks_draggable_cards_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_draggable_cards_container_width" AS ENUM('full', 'container');
  CREATE TYPE "public"."enum_pages_blocks_pricing_card_cards_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum_pages_blocks_pricing_card_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_pricing_card_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_pricing_card_cards_link_size" AS ENUM('default', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_pages_blocks_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts', 'web', 'content');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'custom', 'animated');
  CREATE TYPE "public"."enum_pages_hero_content_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum_pages_hero_content_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline', 'secondary', 'miniOutline', 'link', 'white');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_version_hero_draggable_cards_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_content_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum__pages_v_blocks_content_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_tech_stack_canvas_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum__pages_v_blocks_tech_stack_canvas_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_tech_stack_canvas_container_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_video_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum__pages_v_blocks_video_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_video_player_video_type" AS ENUM('mux', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_draggable_cards_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum__pages_v_blocks_draggable_cards_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_draggable_cards_container_width" AS ENUM('full', 'container');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_card_cards_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_card_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_card_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_pricing_card_cards_link_size" AS ENUM('default', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts', 'web', 'content');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact', 'custom', 'animated');
  CREATE TYPE "public"."enum__pages_v_version_hero_content_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum__pages_v_version_hero_content_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_web_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_web_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_web_blocks_cta_links_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_web_blocks_content_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum_web_blocks_content_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_web_blocks_tech_stack_canvas_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum_web_blocks_tech_stack_canvas_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_web_blocks_tech_stack_canvas_container_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum_web_blocks_video_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum_web_blocks_video_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_web_blocks_video_player_video_type" AS ENUM('mux', 'external');
  CREATE TYPE "public"."enum_web_blocks_draggable_cards_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum_web_blocks_draggable_cards_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_web_blocks_draggable_cards_container_width" AS ENUM('full', 'container');
  CREATE TYPE "public"."enum_web_blocks_pricing_card_cards_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum_web_blocks_pricing_card_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_web_blocks_pricing_card_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_web_blocks_pricing_card_cards_link_size" AS ENUM('default', 'lg');
  CREATE TYPE "public"."enum_web_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_web_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_web_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_web_blocks_content_columns_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_web_blocks_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_web_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_web_blocks_archive_relation_to" AS ENUM('posts', 'web', 'content');
  CREATE TYPE "public"."enum_web_blocks_image_masonry_grid_gap" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_web_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__web_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__web_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__web_v_blocks_cta_links_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum__web_v_blocks_content_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum__web_v_blocks_content_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__web_v_blocks_tech_stack_canvas_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum__web_v_blocks_tech_stack_canvas_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__web_v_blocks_tech_stack_canvas_container_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum__web_v_blocks_video_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum__web_v_blocks_video_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__web_v_blocks_video_player_video_type" AS ENUM('mux', 'external');
  CREATE TYPE "public"."enum__web_v_blocks_draggable_cards_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum__web_v_blocks_draggable_cards_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__web_v_blocks_draggable_cards_container_width" AS ENUM('full', 'container');
  CREATE TYPE "public"."enum__web_v_blocks_pricing_card_cards_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum__web_v_blocks_pricing_card_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__web_v_blocks_pricing_card_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__web_v_blocks_pricing_card_cards_link_size" AS ENUM('default', 'lg');
  CREATE TYPE "public"."enum__web_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__web_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__web_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__web_v_blocks_content_columns_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum__web_v_blocks_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__web_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__web_v_blocks_archive_relation_to" AS ENUM('posts', 'web', 'content');
  CREATE TYPE "public"."enum__web_v_blocks_image_masonry_grid_gap" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum__web_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_content_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_content_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_content_blocks_cta_links_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_content_blocks_content_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum_content_blocks_content_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_content_blocks_tech_stack_canvas_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum_content_blocks_tech_stack_canvas_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_content_blocks_tech_stack_canvas_container_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum_content_blocks_video_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum_content_blocks_video_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_content_blocks_video_player_video_type" AS ENUM('mux', 'external');
  CREATE TYPE "public"."enum_content_blocks_draggable_cards_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum_content_blocks_draggable_cards_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_content_blocks_draggable_cards_container_width" AS ENUM('full', 'container');
  CREATE TYPE "public"."enum_content_blocks_pricing_card_cards_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum_content_blocks_pricing_card_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_content_blocks_pricing_card_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_content_blocks_pricing_card_cards_link_size" AS ENUM('default', 'lg');
  CREATE TYPE "public"."enum_content_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_content_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_content_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_content_blocks_content_columns_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_content_blocks_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_content_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_content_blocks_archive_relation_to" AS ENUM('posts', 'web', 'content');
  CREATE TYPE "public"."enum_content_blocks_image_masonry_grid_gap" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_content_project_type" AS ENUM('photography', 'videography');
  CREATE TYPE "public"."enum_content_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__content_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__content_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__content_v_blocks_cta_links_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum__content_v_blocks_content_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum__content_v_blocks_content_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__content_v_blocks_tech_stack_canvas_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum__content_v_blocks_tech_stack_canvas_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__content_v_blocks_tech_stack_canvas_container_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum__content_v_blocks_video_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum__content_v_blocks_video_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__content_v_blocks_video_player_video_type" AS ENUM('mux', 'external');
  CREATE TYPE "public"."enum__content_v_blocks_draggable_cards_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum__content_v_blocks_draggable_cards_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum__content_v_blocks_draggable_cards_container_width" AS ENUM('full', 'container');
  CREATE TYPE "public"."enum__content_v_blocks_pricing_card_cards_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum__content_v_blocks_pricing_card_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__content_v_blocks_pricing_card_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__content_v_blocks_pricing_card_cards_link_size" AS ENUM('default', 'lg');
  CREATE TYPE "public"."enum__content_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__content_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__content_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__content_v_blocks_content_columns_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum__content_v_blocks_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__content_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__content_v_blocks_archive_relation_to" AS ENUM('posts', 'web', 'content');
  CREATE TYPE "public"."enum__content_v_blocks_image_masonry_grid_gap" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum__content_v_version_project_type" AS ENUM('photography', 'videography');
  CREATE TYPE "public"."enum__content_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_static_pages_blocks_content_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum_static_pages_blocks_content_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_static_pages_blocks_tech_stack_canvas_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum_static_pages_blocks_tech_stack_canvas_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_static_pages_blocks_tech_stack_canvas_container_width" AS ENUM('container', 'full');
  CREATE TYPE "public"."enum_static_pages_blocks_video_card_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait');
  CREATE TYPE "public"."enum_static_pages_blocks_video_card_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_static_pages_blocks_video_player_video_type" AS ENUM('mux', 'external');
  CREATE TYPE "public"."enum_static_pages_blocks_draggable_cards_cards_category" AS ENUM('frontend', 'backend', 'database', 'infrastructure', 'tooling', 'design', 'ai-automation', 'devops', 'security', 'mobile', 'analytics', 'e-commerce', 'email-comm', 'low-code-no-code');
  CREATE TYPE "public"."enum_static_pages_blocks_draggable_cards_cards_size" AS ENUM('sm', 'md', 'lg');
  CREATE TYPE "public"."enum_static_pages_blocks_draggable_cards_container_width" AS ENUM('full', 'container');
  CREATE TYPE "public"."enum_static_pages_blocks_pricing_card_cards_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum_static_pages_blocks_pricing_card_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_static_pages_blocks_pricing_card_cards_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_static_pages_blocks_pricing_card_cards_link_size" AS ENUM('default', 'lg');
  CREATE TYPE "public"."enum_static_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_static_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_static_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_static_pages_blocks_content_columns_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_static_pages_blocks_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_mux_video_playback_options_playback_policy" AS ENUM('signed', 'public');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_blocks_chips_options_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_link_appearance" AS ENUM('default', 'outline', 'secondary', 'miniOutline', 'link');
  CREATE TYPE "public"."enum_header_nav_items_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_nav_items_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_sidebar_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_sidebar_nav_items_link_appearance" AS ENUM('default', 'outline', 'secondary', 'miniOutline', 'link');
  CREATE TYPE "public"."enum_sidebar_nav_items_link_size" AS ENUM('default', 'icon');
  CREATE TYPE "public"."enum_sidebar_nav_items_link_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TABLE "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_hero_links_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_hero_content_card_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" integer
  );
  
  CREATE TABLE "pages_hero_content_card_footer_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"location" varchar,
  	"custom_text" varchar
  );
  
  CREATE TABLE "pages_hero_draggable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"size" "enum_pages_hero_draggable_cards_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"positions_mobile_normalized_x" numeric,
  	"positions_mobile_normalized_y" numeric,
  	"positions_tablet_normalized_x" numeric,
  	"positions_tablet_normalized_y" numeric,
  	"positions_desktop_normalized_x" numeric,
  	"positions_desktop_normalized_y" numeric
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_cta_links_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_card_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" integer
  );
  
  CREATE TABLE "pages_blocks_content_card_footer_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"location" varchar,
  	"custom_text" varchar
  );
  
  CREATE TABLE "pages_blocks_content_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"aspect_ratio" "enum_pages_blocks_content_card_aspect_ratio" DEFAULT 'auto',
  	"cycle_interval" numeric DEFAULT 3,
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_content_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tech_stack_canvas_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum_pages_blocks_tech_stack_canvas_cards_category",
  	"size" "enum_pages_blocks_tech_stack_canvas_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"mobile_normalized_x" numeric,
  	"mobile_normalized_y" numeric,
  	"tablet_normalized_x" numeric,
  	"tablet_normalized_y" numeric,
  	"desktop_normalized_x" numeric,
  	"desktop_normalized_y" numeric
  );
  
  CREATE TABLE "pages_blocks_tech_stack_canvas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum_pages_blocks_tech_stack_canvas_container_width" DEFAULT 'container',
  	"container_height" numeric DEFAULT 600,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" jsonb
  );
  
  CREATE TABLE "pages_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_navigation" boolean DEFAULT true,
  	"show_indicators" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"aspect_ratio" "enum_pages_blocks_video_card_aspect_ratio" DEFAULT 'auto',
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_video_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"footer_meta_title" varchar,
  	"footer_meta_description" varchar,
  	"footer_meta_location" varchar,
  	"footer_meta_custom_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_type" "enum_pages_blocks_video_player_video_type" DEFAULT 'mux',
  	"mux_asset_id" varchar,
  	"external_url" varchar,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"controls" boolean DEFAULT true,
  	"loop" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_draggable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum_pages_blocks_draggable_cards_cards_category",
  	"size" "enum_pages_blocks_draggable_cards_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"positions_mobile_normalized_x" numeric,
  	"positions_mobile_normalized_y" numeric,
  	"positions_tablet_normalized_x" numeric,
  	"positions_tablet_normalized_y" numeric,
  	"positions_desktop_normalized_x" numeric,
  	"positions_desktop_normalized_y" numeric
  );
  
  CREATE TABLE "pages_blocks_draggable_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum_pages_blocks_draggable_cards_container_width" DEFAULT 'full',
  	"container_height" numeric DEFAULT 600,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"cost_indicator" varchar,
  	"icon" "enum_pages_blocks_pricing_card_cards_icon",
  	"title" varchar,
  	"description" varchar,
  	"starting_price" varchar,
  	"includes" jsonb,
  	"link_button_text" varchar DEFAULT 'Ask for Quote',
  	"link_type" "enum_pages_blocks_pricing_card_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_pricing_card_cards_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_pricing_card_cards_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_pricing_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"link_size" "enum_pages_blocks_content_columns_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_pages_blocks_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"hero_dot_grid_dot_size" numeric DEFAULT 10,
  	"hero_dot_grid_gap" numeric DEFAULT 15,
  	"hero_dot_grid_base_color" varchar DEFAULT '#5227FF',
  	"hero_dot_grid_active_color" varchar DEFAULT '#5227FF',
  	"hero_dot_grid_proximity" numeric DEFAULT 120,
  	"hero_dot_grid_shock_radius" numeric DEFAULT 250,
  	"hero_dot_grid_shock_strength" numeric DEFAULT 5,
  	"hero_dot_grid_resistance" numeric DEFAULT 750,
  	"hero_dot_grid_return_duration" numeric DEFAULT 1.5,
  	"hero_content_card_aspect_ratio" "enum_pages_hero_content_card_aspect_ratio" DEFAULT 'auto',
  	"hero_content_card_cycle_interval" numeric DEFAULT 3,
  	"hero_content_card_video_autoplay" boolean DEFAULT false,
  	"hero_content_card_enable_link" boolean DEFAULT false,
  	"hero_content_card_link_type" "enum_pages_hero_content_card_link_type" DEFAULT 'reference',
  	"hero_content_card_link_new_tab" boolean,
  	"hero_content_card_link_url" varchar,
  	"hero_content_card_link_label" varchar,
  	"hero_content_card_enable_footer" boolean DEFAULT false,
  	"hero_draggable_cards_container_height" numeric DEFAULT 400,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"web_id" integer,
  	"content_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_version_hero_links_link_size" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_content_card_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_content_card_footer_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"location" varchar,
  	"custom_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_hero_draggable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"size" "enum__pages_v_version_hero_draggable_cards_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"positions_mobile_normalized_x" numeric,
  	"positions_mobile_normalized_y" numeric,
  	"positions_tablet_normalized_x" numeric,
  	"positions_tablet_normalized_y" numeric,
  	"positions_desktop_normalized_x" numeric,
  	"positions_desktop_normalized_y" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_cta_links_link_size" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_card_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_card_footer_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"location" varchar,
  	"custom_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"aspect_ratio" "enum__pages_v_blocks_content_card_aspect_ratio" DEFAULT 'auto',
  	"cycle_interval" numeric DEFAULT 3,
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_content_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tech_stack_canvas_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum__pages_v_blocks_tech_stack_canvas_cards_category",
  	"size" "enum__pages_v_blocks_tech_stack_canvas_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"mobile_normalized_x" numeric,
  	"mobile_normalized_y" numeric,
  	"tablet_normalized_x" numeric,
  	"tablet_normalized_y" numeric,
  	"desktop_normalized_x" numeric,
  	"desktop_normalized_y" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tech_stack_canvas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum__pages_v_blocks_tech_stack_canvas_container_width" DEFAULT 'container',
  	"container_height" numeric DEFAULT 600,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_navigation" boolean DEFAULT true,
  	"show_indicators" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"aspect_ratio" "enum__pages_v_blocks_video_card_aspect_ratio" DEFAULT 'auto',
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_video_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"footer_meta_title" varchar,
  	"footer_meta_description" varchar,
  	"footer_meta_location" varchar,
  	"footer_meta_custom_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_type" "enum__pages_v_blocks_video_player_video_type" DEFAULT 'mux',
  	"mux_asset_id" varchar,
  	"external_url" varchar,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"controls" boolean DEFAULT true,
  	"loop" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_draggable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum__pages_v_blocks_draggable_cards_cards_category",
  	"size" "enum__pages_v_blocks_draggable_cards_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"positions_mobile_normalized_x" numeric,
  	"positions_mobile_normalized_y" numeric,
  	"positions_tablet_normalized_x" numeric,
  	"positions_tablet_normalized_y" numeric,
  	"positions_desktop_normalized_x" numeric,
  	"positions_desktop_normalized_y" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_draggable_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum__pages_v_blocks_draggable_cards_container_width" DEFAULT 'full',
  	"container_height" numeric DEFAULT 600,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"cost_indicator" varchar,
  	"icon" "enum__pages_v_blocks_pricing_card_cards_icon",
  	"title" varchar,
  	"description" varchar,
  	"starting_price" varchar,
  	"includes" jsonb,
  	"link_button_text" varchar DEFAULT 'Ask for Quote',
  	"link_type" "enum__pages_v_blocks_pricing_card_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_pricing_card_cards_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_pricing_card_cards_link_size" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"link_size" "enum__pages_v_blocks_content_columns_link_size" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__pages_v_blocks_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_hero_dot_grid_dot_size" numeric DEFAULT 10,
  	"version_hero_dot_grid_gap" numeric DEFAULT 15,
  	"version_hero_dot_grid_base_color" varchar DEFAULT '#5227FF',
  	"version_hero_dot_grid_active_color" varchar DEFAULT '#5227FF',
  	"version_hero_dot_grid_proximity" numeric DEFAULT 120,
  	"version_hero_dot_grid_shock_radius" numeric DEFAULT 250,
  	"version_hero_dot_grid_shock_strength" numeric DEFAULT 5,
  	"version_hero_dot_grid_resistance" numeric DEFAULT 750,
  	"version_hero_dot_grid_return_duration" numeric DEFAULT 1.5,
  	"version_hero_content_card_aspect_ratio" "enum__pages_v_version_hero_content_card_aspect_ratio" DEFAULT 'auto',
  	"version_hero_content_card_cycle_interval" numeric DEFAULT 3,
  	"version_hero_content_card_video_autoplay" boolean DEFAULT false,
  	"version_hero_content_card_enable_link" boolean DEFAULT false,
  	"version_hero_content_card_link_type" "enum__pages_v_version_hero_content_card_link_type" DEFAULT 'reference',
  	"version_hero_content_card_link_new_tab" boolean,
  	"version_hero_content_card_link_url" varchar,
  	"version_hero_content_card_link_label" varchar,
  	"version_hero_content_card_enable_footer" boolean DEFAULT false,
  	"version_hero_draggable_cards_container_height" numeric DEFAULT 400,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"web_id" integer,
  	"content_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
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
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
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
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
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
  
  CREATE TABLE "web_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_web_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_web_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_web_blocks_cta_links_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "web_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_content_card_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" integer
  );
  
  CREATE TABLE "web_blocks_content_card_footer_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"location" varchar,
  	"custom_text" varchar
  );
  
  CREATE TABLE "web_blocks_content_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"aspect_ratio" "enum_web_blocks_content_card_aspect_ratio" DEFAULT 'auto',
  	"cycle_interval" numeric DEFAULT 3,
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_web_blocks_content_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_tech_stack_canvas_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum_web_blocks_tech_stack_canvas_cards_category",
  	"size" "enum_web_blocks_tech_stack_canvas_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"mobile_normalized_x" numeric,
  	"mobile_normalized_y" numeric,
  	"tablet_normalized_x" numeric,
  	"tablet_normalized_y" numeric,
  	"desktop_normalized_x" numeric,
  	"desktop_normalized_y" numeric
  );
  
  CREATE TABLE "web_blocks_tech_stack_canvas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum_web_blocks_tech_stack_canvas_container_width" DEFAULT 'container',
  	"container_height" numeric DEFAULT 600,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" jsonb
  );
  
  CREATE TABLE "web_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_navigation" boolean DEFAULT true,
  	"show_indicators" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_video_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"aspect_ratio" "enum_web_blocks_video_card_aspect_ratio" DEFAULT 'auto',
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_web_blocks_video_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"footer_meta_title" varchar,
  	"footer_meta_description" varchar,
  	"footer_meta_location" varchar,
  	"footer_meta_custom_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_video_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_type" "enum_web_blocks_video_player_video_type" DEFAULT 'mux',
  	"mux_asset_id" varchar,
  	"external_url" varchar,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"controls" boolean DEFAULT true,
  	"loop" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_draggable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum_web_blocks_draggable_cards_cards_category",
  	"size" "enum_web_blocks_draggable_cards_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"positions_mobile_normalized_x" numeric,
  	"positions_mobile_normalized_y" numeric,
  	"positions_tablet_normalized_x" numeric,
  	"positions_tablet_normalized_y" numeric,
  	"positions_desktop_normalized_x" numeric,
  	"positions_desktop_normalized_y" numeric
  );
  
  CREATE TABLE "web_blocks_draggable_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum_web_blocks_draggable_cards_container_width" DEFAULT 'full',
  	"container_height" numeric DEFAULT 600,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_pricing_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"cost_indicator" varchar,
  	"icon" "enum_web_blocks_pricing_card_cards_icon",
  	"title" varchar,
  	"description" varchar,
  	"starting_price" varchar,
  	"includes" jsonb,
  	"link_button_text" varchar DEFAULT 'Ask for Quote',
  	"link_type" "enum_web_blocks_pricing_card_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_web_blocks_pricing_card_cards_link_appearance" DEFAULT 'default',
  	"link_size" "enum_web_blocks_pricing_card_cards_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "web_blocks_pricing_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_web_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_web_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_web_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"link_size" "enum_web_blocks_content_columns_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "web_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_web_blocks_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_web_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_web_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_image_masonry_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "web_blocks_image_masonry_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"gap" "enum_web_blocks_image_masonry_grid_gap" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "web_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "web" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_web_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "web_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"web_id" integer,
  	"content_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_web_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__web_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__web_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__web_v_blocks_cta_links_link_size" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_web_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_content_card_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_web_v_blocks_content_card_footer_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"location" varchar,
  	"custom_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_web_v_blocks_content_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"aspect_ratio" "enum__web_v_blocks_content_card_aspect_ratio" DEFAULT 'auto',
  	"cycle_interval" numeric DEFAULT 3,
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__web_v_blocks_content_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_tech_stack_canvas_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum__web_v_blocks_tech_stack_canvas_cards_category",
  	"size" "enum__web_v_blocks_tech_stack_canvas_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"mobile_normalized_x" numeric,
  	"mobile_normalized_y" numeric,
  	"tablet_normalized_x" numeric,
  	"tablet_normalized_y" numeric,
  	"desktop_normalized_x" numeric,
  	"desktop_normalized_y" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_web_v_blocks_tech_stack_canvas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum__web_v_blocks_tech_stack_canvas_container_width" DEFAULT 'container',
  	"container_height" numeric DEFAULT 600,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_web_v_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_navigation" boolean DEFAULT true,
  	"show_indicators" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_video_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"aspect_ratio" "enum__web_v_blocks_video_card_aspect_ratio" DEFAULT 'auto',
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__web_v_blocks_video_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"footer_meta_title" varchar,
  	"footer_meta_description" varchar,
  	"footer_meta_location" varchar,
  	"footer_meta_custom_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_video_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_type" "enum__web_v_blocks_video_player_video_type" DEFAULT 'mux',
  	"mux_asset_id" varchar,
  	"external_url" varchar,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"controls" boolean DEFAULT true,
  	"loop" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_draggable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum__web_v_blocks_draggable_cards_cards_category",
  	"size" "enum__web_v_blocks_draggable_cards_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"positions_mobile_normalized_x" numeric,
  	"positions_mobile_normalized_y" numeric,
  	"positions_tablet_normalized_x" numeric,
  	"positions_tablet_normalized_y" numeric,
  	"positions_desktop_normalized_x" numeric,
  	"positions_desktop_normalized_y" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_web_v_blocks_draggable_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum__web_v_blocks_draggable_cards_container_width" DEFAULT 'full',
  	"container_height" numeric DEFAULT 600,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_pricing_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"cost_indicator" varchar,
  	"icon" "enum__web_v_blocks_pricing_card_cards_icon",
  	"title" varchar,
  	"description" varchar,
  	"starting_price" varchar,
  	"includes" jsonb,
  	"link_button_text" varchar DEFAULT 'Ask for Quote',
  	"link_type" "enum__web_v_blocks_pricing_card_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__web_v_blocks_pricing_card_cards_link_appearance" DEFAULT 'default',
  	"link_size" "enum__web_v_blocks_pricing_card_cards_link_size" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_web_v_blocks_pricing_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__web_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__web_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__web_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"link_size" "enum__web_v_blocks_content_columns_link_size" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_web_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__web_v_blocks_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__web_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__web_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_image_masonry_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_web_v_blocks_image_masonry_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"gap" "enum__web_v_blocks_image_masonry_grid_gap" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_web_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__web_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_web_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"web_id" integer,
  	"content_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "content_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_content_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_content_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum_content_blocks_cta_links_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "content_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_content_card_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" integer
  );
  
  CREATE TABLE "content_blocks_content_card_footer_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"location" varchar,
  	"custom_text" varchar
  );
  
  CREATE TABLE "content_blocks_content_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"aspect_ratio" "enum_content_blocks_content_card_aspect_ratio" DEFAULT 'auto',
  	"cycle_interval" numeric DEFAULT 3,
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_content_blocks_content_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_tech_stack_canvas_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum_content_blocks_tech_stack_canvas_cards_category",
  	"size" "enum_content_blocks_tech_stack_canvas_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"mobile_normalized_x" numeric,
  	"mobile_normalized_y" numeric,
  	"tablet_normalized_x" numeric,
  	"tablet_normalized_y" numeric,
  	"desktop_normalized_x" numeric,
  	"desktop_normalized_y" numeric
  );
  
  CREATE TABLE "content_blocks_tech_stack_canvas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum_content_blocks_tech_stack_canvas_container_width" DEFAULT 'container',
  	"container_height" numeric DEFAULT 600,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" jsonb
  );
  
  CREATE TABLE "content_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_navigation" boolean DEFAULT true,
  	"show_indicators" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_video_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"aspect_ratio" "enum_content_blocks_video_card_aspect_ratio" DEFAULT 'auto',
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_content_blocks_video_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"footer_meta_title" varchar,
  	"footer_meta_description" varchar,
  	"footer_meta_location" varchar,
  	"footer_meta_custom_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_video_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_type" "enum_content_blocks_video_player_video_type" DEFAULT 'mux',
  	"mux_asset_id" varchar,
  	"external_url" varchar,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"controls" boolean DEFAULT true,
  	"loop" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_draggable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum_content_blocks_draggable_cards_cards_category",
  	"size" "enum_content_blocks_draggable_cards_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"positions_mobile_normalized_x" numeric,
  	"positions_mobile_normalized_y" numeric,
  	"positions_tablet_normalized_x" numeric,
  	"positions_tablet_normalized_y" numeric,
  	"positions_desktop_normalized_x" numeric,
  	"positions_desktop_normalized_y" numeric
  );
  
  CREATE TABLE "content_blocks_draggable_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum_content_blocks_draggable_cards_container_width" DEFAULT 'full',
  	"container_height" numeric DEFAULT 600,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_pricing_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"cost_indicator" varchar,
  	"icon" "enum_content_blocks_pricing_card_cards_icon",
  	"title" varchar,
  	"description" varchar,
  	"starting_price" varchar,
  	"includes" jsonb,
  	"link_button_text" varchar DEFAULT 'Ask for Quote',
  	"link_type" "enum_content_blocks_pricing_card_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_content_blocks_pricing_card_cards_link_appearance" DEFAULT 'default',
  	"link_size" "enum_content_blocks_pricing_card_cards_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "content_blocks_pricing_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_content_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_content_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_content_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"link_size" "enum_content_blocks_content_columns_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "content_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_content_blocks_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_content_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_content_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_image_masonry_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "content_blocks_image_masonry_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"gap" "enum_content_blocks_image_masonry_grid_gap" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "content_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"project_type" "enum_content_project_type",
  	"hero_image_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_content_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "content_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"web_id" integer,
  	"content_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_content_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__content_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__content_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"link_size" "enum__content_v_blocks_cta_links_link_size" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_content_card_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_v_blocks_content_card_footer_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"location" varchar,
  	"custom_text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_v_blocks_content_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"aspect_ratio" "enum__content_v_blocks_content_card_aspect_ratio" DEFAULT 'auto',
  	"cycle_interval" numeric DEFAULT 3,
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__content_v_blocks_content_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_tech_stack_canvas_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum__content_v_blocks_tech_stack_canvas_cards_category",
  	"size" "enum__content_v_blocks_tech_stack_canvas_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"mobile_normalized_x" numeric,
  	"mobile_normalized_y" numeric,
  	"tablet_normalized_x" numeric,
  	"tablet_normalized_y" numeric,
  	"desktop_normalized_x" numeric,
  	"desktop_normalized_y" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_v_blocks_tech_stack_canvas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum__content_v_blocks_tech_stack_canvas_container_width" DEFAULT 'container',
  	"container_height" numeric DEFAULT 600,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_v_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_navigation" boolean DEFAULT true,
  	"show_indicators" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_video_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_id" integer,
  	"aspect_ratio" "enum__content_v_blocks_video_card_aspect_ratio" DEFAULT 'auto',
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__content_v_blocks_video_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"footer_meta_title" varchar,
  	"footer_meta_description" varchar,
  	"footer_meta_location" varchar,
  	"footer_meta_custom_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_video_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"video_type" "enum__content_v_blocks_video_player_video_type" DEFAULT 'mux',
  	"mux_asset_id" varchar,
  	"external_url" varchar,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"controls" boolean DEFAULT true,
  	"loop" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_draggable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"category" "enum__content_v_blocks_draggable_cards_cards_category",
  	"size" "enum__content_v_blocks_draggable_cards_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"positions_mobile_normalized_x" numeric,
  	"positions_mobile_normalized_y" numeric,
  	"positions_tablet_normalized_x" numeric,
  	"positions_tablet_normalized_y" numeric,
  	"positions_desktop_normalized_x" numeric,
  	"positions_desktop_normalized_y" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_v_blocks_draggable_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum__content_v_blocks_draggable_cards_container_width" DEFAULT 'full',
  	"container_height" numeric DEFAULT 600,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_pricing_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"cost_indicator" varchar,
  	"icon" "enum__content_v_blocks_pricing_card_cards_icon",
  	"title" varchar,
  	"description" varchar,
  	"starting_price" varchar,
  	"includes" jsonb,
  	"link_button_text" varchar DEFAULT 'Ask for Quote',
  	"link_type" "enum__content_v_blocks_pricing_card_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__content_v_blocks_pricing_card_cards_link_appearance" DEFAULT 'default',
  	"link_size" "enum__content_v_blocks_pricing_card_cards_link_size" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_v_blocks_pricing_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__content_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__content_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__content_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"link_size" "enum__content_v_blocks_content_columns_link_size" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"columns" "enum__content_v_blocks_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__content_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__content_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_image_masonry_grid_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_v_blocks_image_masonry_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"gap" "enum__content_v_blocks_image_masonry_grid_gap" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_project_type" "enum__content_v_version_project_type",
  	"version_hero_image_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__content_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_content_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"web_id" integer,
  	"content_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "static_pages_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_content_card_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" integer NOT NULL
  );
  
  CREATE TABLE "static_pages_blocks_content_card_footer_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"location" varchar,
  	"custom_text" varchar
  );
  
  CREATE TABLE "static_pages_blocks_content_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"aspect_ratio" "enum_static_pages_blocks_content_card_aspect_ratio" DEFAULT 'auto',
  	"cycle_interval" numeric DEFAULT 3,
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_static_pages_blocks_content_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_tech_stack_canvas_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"category" "enum_static_pages_blocks_tech_stack_canvas_cards_category" NOT NULL,
  	"size" "enum_static_pages_blocks_tech_stack_canvas_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"mobile_normalized_x" numeric,
  	"mobile_normalized_y" numeric,
  	"tablet_normalized_x" numeric,
  	"tablet_normalized_y" numeric,
  	"desktop_normalized_x" numeric,
  	"desktop_normalized_y" numeric
  );
  
  CREATE TABLE "static_pages_blocks_tech_stack_canvas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum_static_pages_blocks_tech_stack_canvas_container_width" DEFAULT 'container',
  	"container_height" numeric DEFAULT 600,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"caption" jsonb
  );
  
  CREATE TABLE "static_pages_blocks_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_navigation" boolean DEFAULT true,
  	"show_indicators" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_video_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer NOT NULL,
  	"aspect_ratio" "enum_static_pages_blocks_video_card_aspect_ratio" DEFAULT 'auto',
  	"video_autoplay" boolean DEFAULT false,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_static_pages_blocks_video_card_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"enable_footer" boolean DEFAULT false,
  	"footer_meta_title" varchar,
  	"footer_meta_description" varchar,
  	"footer_meta_location" varchar,
  	"footer_meta_custom_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_video_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_type" "enum_static_pages_blocks_video_player_video_type" DEFAULT 'mux' NOT NULL,
  	"mux_asset_id" varchar,
  	"external_url" varchar,
  	"poster_id" integer,
  	"autoplay" boolean DEFAULT false,
  	"controls" boolean DEFAULT true,
  	"loop" boolean DEFAULT false,
  	"muted" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_draggable_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer,
  	"category" "enum_static_pages_blocks_draggable_cards_cards_category",
  	"size" "enum_static_pages_blocks_draggable_cards_cards_size" DEFAULT 'md',
  	"description" varchar,
  	"website_url" varchar,
  	"positions_mobile_normalized_x" numeric,
  	"positions_mobile_normalized_y" numeric,
  	"positions_tablet_normalized_x" numeric,
  	"positions_tablet_normalized_y" numeric,
  	"positions_desktop_normalized_x" numeric,
  	"positions_desktop_normalized_y" numeric
  );
  
  CREATE TABLE "static_pages_blocks_draggable_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"container_width" "enum_static_pages_blocks_draggable_cards_container_width" DEFAULT 'full',
  	"container_height" numeric DEFAULT 600,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_pricing_card_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_label" varchar NOT NULL,
  	"cost_indicator" varchar,
  	"icon" "enum_static_pages_blocks_pricing_card_cards_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"starting_price" varchar NOT NULL,
  	"includes" jsonb,
  	"link_button_text" varchar DEFAULT 'Ask for Quote',
  	"link_type" "enum_static_pages_blocks_pricing_card_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_static_pages_blocks_pricing_card_cards_link_appearance" DEFAULT 'default',
  	"link_size" "enum_static_pages_blocks_pricing_card_cards_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "static_pages_blocks_pricing_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_static_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_static_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_static_pages_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"link_size" "enum_static_pages_blocks_content_columns_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "static_pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"columns" "enum_static_pages_blocks_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"slug" varchar NOT NULL,
  	"featured_image_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "static_pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"web_id" integer,
  	"content_id" integer
  );
  
  CREATE TABLE "mux_video_playback_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"playback_id" varchar,
  	"playback_policy" "enum_mux_video_playback_options_playback_policy"
  );
  
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
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
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
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
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
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
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
  
  CREATE TABLE "forms_blocks_chips_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum_forms_blocks_chips_options_icon" NOT NULL
  );
  
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
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
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
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"web_id" integer,
  	"content_id" integer,
  	"posts_id" integer
  );
  
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
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"users_id" integer,
  	"web_id" integer,
  	"content_id" integer,
  	"static_pages_id" integer,
  	"mux_video_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_jobs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
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
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"web_id" integer,
  	"content_id" integer
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_size" "enum_footer_nav_items_link_size" DEFAULT 'default'
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"web_id" integer,
  	"content_id" integer
  );
  
  CREATE TABLE "sidebar_nav_items_show_on_pages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "sidebar_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_sidebar_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_sidebar_nav_items_link_appearance" DEFAULT 'default',
  	"link_size" "enum_sidebar_nav_items_link_size" DEFAULT 'default',
  	"link_icon" "enum_sidebar_nav_items_link_icon"
  );
  
  CREATE TABLE "sidebar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "sidebar_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"web_id" integer,
  	"content_id" integer
  );
  
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_content_card_media" ADD CONSTRAINT "pages_hero_content_card_media_item_id_media_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero_content_card_media" ADD CONSTRAINT "pages_hero_content_card_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_content_card_footer_meta" ADD CONSTRAINT "pages_hero_content_card_footer_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_draggable_cards_cards" ADD CONSTRAINT "pages_hero_draggable_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero_draggable_cards_cards" ADD CONSTRAINT "pages_hero_draggable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_card_media" ADD CONSTRAINT "pages_blocks_content_card_media_item_id_media_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_card_media" ADD CONSTRAINT "pages_blocks_content_card_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_card_footer_meta" ADD CONSTRAINT "pages_blocks_content_card_footer_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_card" ADD CONSTRAINT "pages_blocks_content_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "pages_blocks_tech_stack_canvas_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "pages_blocks_tech_stack_canvas_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tech_stack_canvas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tech_stack_canvas" ADD CONSTRAINT "pages_blocks_tech_stack_canvas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_slides" ADD CONSTRAINT "pages_blocks_carousel_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel_slides" ADD CONSTRAINT "pages_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_carousel" ADD CONSTRAINT "pages_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_card" ADD CONSTRAINT "pages_blocks_video_card_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_card" ADD CONSTRAINT "pages_blocks_video_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_player" ADD CONSTRAINT "pages_blocks_video_player_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_player" ADD CONSTRAINT "pages_blocks_video_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_draggable_cards_cards" ADD CONSTRAINT "pages_blocks_draggable_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_draggable_cards_cards" ADD CONSTRAINT "pages_blocks_draggable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_draggable_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_draggable_cards" ADD CONSTRAINT "pages_blocks_draggable_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_card_cards" ADD CONSTRAINT "pages_blocks_pricing_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_card" ADD CONSTRAINT "pages_blocks_pricing_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid" ADD CONSTRAINT "pages_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_content_card_media" ADD CONSTRAINT "_pages_v_version_hero_content_card_media_item_id_media_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_content_card_media" ADD CONSTRAINT "_pages_v_version_hero_content_card_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_content_card_footer_meta" ADD CONSTRAINT "_pages_v_version_hero_content_card_footer_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_draggable_cards_cards" ADD CONSTRAINT "_pages_v_version_hero_draggable_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_draggable_cards_cards" ADD CONSTRAINT "_pages_v_version_hero_draggable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_card_media" ADD CONSTRAINT "_pages_v_blocks_content_card_media_item_id_media_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_card_media" ADD CONSTRAINT "_pages_v_blocks_content_card_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_card_footer_meta" ADD CONSTRAINT "_pages_v_blocks_content_card_footer_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_card" ADD CONSTRAINT "_pages_v_blocks_content_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "_pages_v_blocks_tech_stack_canvas_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "_pages_v_blocks_tech_stack_canvas_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tech_stack_canvas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tech_stack_canvas" ADD CONSTRAINT "_pages_v_blocks_tech_stack_canvas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_carousel_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_carousel" ADD CONSTRAINT "_pages_v_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_card" ADD CONSTRAINT "_pages_v_blocks_video_card_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_card" ADD CONSTRAINT "_pages_v_blocks_video_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_player" ADD CONSTRAINT "_pages_v_blocks_video_player_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_player" ADD CONSTRAINT "_pages_v_blocks_video_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_draggable_cards_cards" ADD CONSTRAINT "_pages_v_blocks_draggable_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_draggable_cards_cards" ADD CONSTRAINT "_pages_v_blocks_draggable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_draggable_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_draggable_cards" ADD CONSTRAINT "_pages_v_blocks_draggable_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_card_cards" ADD CONSTRAINT "_pages_v_blocks_pricing_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_card" ADD CONSTRAINT "_pages_v_blocks_pricing_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grid" ADD CONSTRAINT "_pages_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_cta_links" ADD CONSTRAINT "web_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_cta" ADD CONSTRAINT "web_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_content_card_media" ADD CONSTRAINT "web_blocks_content_card_media_item_id_media_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_blocks_content_card_media" ADD CONSTRAINT "web_blocks_content_card_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_content_card_footer_meta" ADD CONSTRAINT "web_blocks_content_card_footer_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_content_card" ADD CONSTRAINT "web_blocks_content_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "web_blocks_tech_stack_canvas_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "web_blocks_tech_stack_canvas_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web_blocks_tech_stack_canvas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_tech_stack_canvas" ADD CONSTRAINT "web_blocks_tech_stack_canvas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_carousel_slides" ADD CONSTRAINT "web_blocks_carousel_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_blocks_carousel_slides" ADD CONSTRAINT "web_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_carousel" ADD CONSTRAINT "web_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_video_card" ADD CONSTRAINT "web_blocks_video_card_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_blocks_video_card" ADD CONSTRAINT "web_blocks_video_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_video_player" ADD CONSTRAINT "web_blocks_video_player_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_blocks_video_player" ADD CONSTRAINT "web_blocks_video_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_form_block" ADD CONSTRAINT "web_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_blocks_form_block" ADD CONSTRAINT "web_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_draggable_cards_cards" ADD CONSTRAINT "web_blocks_draggable_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_blocks_draggable_cards_cards" ADD CONSTRAINT "web_blocks_draggable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web_blocks_draggable_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_draggable_cards" ADD CONSTRAINT "web_blocks_draggable_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_pricing_card_cards" ADD CONSTRAINT "web_blocks_pricing_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web_blocks_pricing_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_pricing_card" ADD CONSTRAINT "web_blocks_pricing_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_content_columns" ADD CONSTRAINT "web_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_content" ADD CONSTRAINT "web_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_grid" ADD CONSTRAINT "web_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_media_block" ADD CONSTRAINT "web_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_blocks_media_block" ADD CONSTRAINT "web_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_archive" ADD CONSTRAINT "web_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_image_masonry_grid_images" ADD CONSTRAINT "web_blocks_image_masonry_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_blocks_image_masonry_grid_images" ADD CONSTRAINT "web_blocks_image_masonry_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web_blocks_image_masonry_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_image_masonry_grid" ADD CONSTRAINT "web_blocks_image_masonry_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_populated_authors" ADD CONSTRAINT "web_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web" ADD CONSTRAINT "web_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web" ADD CONSTRAINT "web_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_rels" ADD CONSTRAINT "web_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_rels" ADD CONSTRAINT "web_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_rels" ADD CONSTRAINT "web_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_rels" ADD CONSTRAINT "web_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_rels" ADD CONSTRAINT "web_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_rels" ADD CONSTRAINT "web_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_rels" ADD CONSTRAINT "web_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_cta_links" ADD CONSTRAINT "_web_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_cta" ADD CONSTRAINT "_web_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_content_card_media" ADD CONSTRAINT "_web_v_blocks_content_card_media_item_id_media_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_content_card_media" ADD CONSTRAINT "_web_v_blocks_content_card_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_content_card_footer_meta" ADD CONSTRAINT "_web_v_blocks_content_card_footer_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_content_card" ADD CONSTRAINT "_web_v_blocks_content_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "_web_v_blocks_tech_stack_canvas_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "_web_v_blocks_tech_stack_canvas_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v_blocks_tech_stack_canvas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_tech_stack_canvas" ADD CONSTRAINT "_web_v_blocks_tech_stack_canvas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_carousel_slides" ADD CONSTRAINT "_web_v_blocks_carousel_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_carousel_slides" ADD CONSTRAINT "_web_v_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_carousel" ADD CONSTRAINT "_web_v_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_video_card" ADD CONSTRAINT "_web_v_blocks_video_card_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_video_card" ADD CONSTRAINT "_web_v_blocks_video_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_video_player" ADD CONSTRAINT "_web_v_blocks_video_player_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_video_player" ADD CONSTRAINT "_web_v_blocks_video_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_form_block" ADD CONSTRAINT "_web_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_form_block" ADD CONSTRAINT "_web_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_draggable_cards_cards" ADD CONSTRAINT "_web_v_blocks_draggable_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_draggable_cards_cards" ADD CONSTRAINT "_web_v_blocks_draggable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v_blocks_draggable_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_draggable_cards" ADD CONSTRAINT "_web_v_blocks_draggable_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_pricing_card_cards" ADD CONSTRAINT "_web_v_blocks_pricing_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v_blocks_pricing_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_pricing_card" ADD CONSTRAINT "_web_v_blocks_pricing_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_content_columns" ADD CONSTRAINT "_web_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_content" ADD CONSTRAINT "_web_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_grid" ADD CONSTRAINT "_web_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_media_block" ADD CONSTRAINT "_web_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_media_block" ADD CONSTRAINT "_web_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_archive" ADD CONSTRAINT "_web_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_image_masonry_grid_images" ADD CONSTRAINT "_web_v_blocks_image_masonry_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_image_masonry_grid_images" ADD CONSTRAINT "_web_v_blocks_image_masonry_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v_blocks_image_masonry_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_image_masonry_grid" ADD CONSTRAINT "_web_v_blocks_image_masonry_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_version_populated_authors" ADD CONSTRAINT "_web_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v" ADD CONSTRAINT "_web_v_parent_id_web_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."web"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v" ADD CONSTRAINT "_web_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v" ADD CONSTRAINT "_web_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_rels" ADD CONSTRAINT "_web_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_rels" ADD CONSTRAINT "_web_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_rels" ADD CONSTRAINT "_web_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_rels" ADD CONSTRAINT "_web_v_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_rels" ADD CONSTRAINT "_web_v_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_rels" ADD CONSTRAINT "_web_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_rels" ADD CONSTRAINT "_web_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_cta_links" ADD CONSTRAINT "content_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_cta" ADD CONSTRAINT "content_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_content_card_media" ADD CONSTRAINT "content_blocks_content_card_media_item_id_media_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_blocks_content_card_media" ADD CONSTRAINT "content_blocks_content_card_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_content_card_footer_meta" ADD CONSTRAINT "content_blocks_content_card_footer_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_content_card" ADD CONSTRAINT "content_blocks_content_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "content_blocks_tech_stack_canvas_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "content_blocks_tech_stack_canvas_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_blocks_tech_stack_canvas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_tech_stack_canvas" ADD CONSTRAINT "content_blocks_tech_stack_canvas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_carousel_slides" ADD CONSTRAINT "content_blocks_carousel_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_blocks_carousel_slides" ADD CONSTRAINT "content_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_carousel" ADD CONSTRAINT "content_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_video_card" ADD CONSTRAINT "content_blocks_video_card_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_blocks_video_card" ADD CONSTRAINT "content_blocks_video_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_video_player" ADD CONSTRAINT "content_blocks_video_player_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_blocks_video_player" ADD CONSTRAINT "content_blocks_video_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_form_block" ADD CONSTRAINT "content_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_blocks_form_block" ADD CONSTRAINT "content_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_draggable_cards_cards" ADD CONSTRAINT "content_blocks_draggable_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_blocks_draggable_cards_cards" ADD CONSTRAINT "content_blocks_draggable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_blocks_draggable_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_draggable_cards" ADD CONSTRAINT "content_blocks_draggable_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_pricing_card_cards" ADD CONSTRAINT "content_blocks_pricing_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_blocks_pricing_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_pricing_card" ADD CONSTRAINT "content_blocks_pricing_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_content_columns" ADD CONSTRAINT "content_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_content" ADD CONSTRAINT "content_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_grid" ADD CONSTRAINT "content_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_media_block" ADD CONSTRAINT "content_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_blocks_media_block" ADD CONSTRAINT "content_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_archive" ADD CONSTRAINT "content_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_image_masonry_grid_images" ADD CONSTRAINT "content_blocks_image_masonry_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_blocks_image_masonry_grid_images" ADD CONSTRAINT "content_blocks_image_masonry_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_blocks_image_masonry_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_image_masonry_grid" ADD CONSTRAINT "content_blocks_image_masonry_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_populated_authors" ADD CONSTRAINT "content_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content" ADD CONSTRAINT "content_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_rels" ADD CONSTRAINT "content_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_rels" ADD CONSTRAINT "content_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_rels" ADD CONSTRAINT "content_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_rels" ADD CONSTRAINT "content_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_rels" ADD CONSTRAINT "content_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_rels" ADD CONSTRAINT "content_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_rels" ADD CONSTRAINT "content_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_cta_links" ADD CONSTRAINT "_content_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_cta" ADD CONSTRAINT "_content_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_content_card_media" ADD CONSTRAINT "_content_v_blocks_content_card_media_item_id_media_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_content_card_media" ADD CONSTRAINT "_content_v_blocks_content_card_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_content_card_footer_meta" ADD CONSTRAINT "_content_v_blocks_content_card_footer_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_content_card" ADD CONSTRAINT "_content_v_blocks_content_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "_content_v_blocks_tech_stack_canvas_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "_content_v_blocks_tech_stack_canvas_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v_blocks_tech_stack_canvas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_tech_stack_canvas" ADD CONSTRAINT "_content_v_blocks_tech_stack_canvas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_carousel_slides" ADD CONSTRAINT "_content_v_blocks_carousel_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_carousel_slides" ADD CONSTRAINT "_content_v_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_carousel" ADD CONSTRAINT "_content_v_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_video_card" ADD CONSTRAINT "_content_v_blocks_video_card_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_video_card" ADD CONSTRAINT "_content_v_blocks_video_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_video_player" ADD CONSTRAINT "_content_v_blocks_video_player_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_video_player" ADD CONSTRAINT "_content_v_blocks_video_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_form_block" ADD CONSTRAINT "_content_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_form_block" ADD CONSTRAINT "_content_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_draggable_cards_cards" ADD CONSTRAINT "_content_v_blocks_draggable_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_draggable_cards_cards" ADD CONSTRAINT "_content_v_blocks_draggable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v_blocks_draggable_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_draggable_cards" ADD CONSTRAINT "_content_v_blocks_draggable_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_pricing_card_cards" ADD CONSTRAINT "_content_v_blocks_pricing_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v_blocks_pricing_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_pricing_card" ADD CONSTRAINT "_content_v_blocks_pricing_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_content_columns" ADD CONSTRAINT "_content_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_content" ADD CONSTRAINT "_content_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_grid" ADD CONSTRAINT "_content_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_media_block" ADD CONSTRAINT "_content_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_media_block" ADD CONSTRAINT "_content_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_archive" ADD CONSTRAINT "_content_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_image_masonry_grid_images" ADD CONSTRAINT "_content_v_blocks_image_masonry_grid_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_image_masonry_grid_images" ADD CONSTRAINT "_content_v_blocks_image_masonry_grid_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v_blocks_image_masonry_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_image_masonry_grid" ADD CONSTRAINT "_content_v_blocks_image_masonry_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_version_populated_authors" ADD CONSTRAINT "_content_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v" ADD CONSTRAINT "_content_v_parent_id_content_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."content"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v" ADD CONSTRAINT "_content_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v" ADD CONSTRAINT "_content_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_rels" ADD CONSTRAINT "_content_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_rels" ADD CONSTRAINT "_content_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_rels" ADD CONSTRAINT "_content_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_rels" ADD CONSTRAINT "_content_v_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_rels" ADD CONSTRAINT "_content_v_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_rels" ADD CONSTRAINT "_content_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_rels" ADD CONSTRAINT "_content_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_rich_text_block" ADD CONSTRAINT "static_pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_content_card_media" ADD CONSTRAINT "static_pages_blocks_content_card_media_item_id_media_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_content_card_media" ADD CONSTRAINT "static_pages_blocks_content_card_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_content_card_footer_meta" ADD CONSTRAINT "static_pages_blocks_content_card_footer_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages_blocks_content_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_content_card" ADD CONSTRAINT "static_pages_blocks_content_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "static_pages_blocks_tech_stack_canvas_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_tech_stack_canvas_cards" ADD CONSTRAINT "static_pages_blocks_tech_stack_canvas_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages_blocks_tech_stack_canvas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_tech_stack_canvas" ADD CONSTRAINT "static_pages_blocks_tech_stack_canvas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_carousel_slides" ADD CONSTRAINT "static_pages_blocks_carousel_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_carousel_slides" ADD CONSTRAINT "static_pages_blocks_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages_blocks_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_carousel" ADD CONSTRAINT "static_pages_blocks_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_video_card" ADD CONSTRAINT "static_pages_blocks_video_card_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_video_card" ADD CONSTRAINT "static_pages_blocks_video_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_video_player" ADD CONSTRAINT "static_pages_blocks_video_player_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_video_player" ADD CONSTRAINT "static_pages_blocks_video_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_form_block" ADD CONSTRAINT "static_pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_form_block" ADD CONSTRAINT "static_pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_draggable_cards_cards" ADD CONSTRAINT "static_pages_blocks_draggable_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_draggable_cards_cards" ADD CONSTRAINT "static_pages_blocks_draggable_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages_blocks_draggable_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_draggable_cards" ADD CONSTRAINT "static_pages_blocks_draggable_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_pricing_card_cards" ADD CONSTRAINT "static_pages_blocks_pricing_card_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages_blocks_pricing_card"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_pricing_card" ADD CONSTRAINT "static_pages_blocks_pricing_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_content_columns" ADD CONSTRAINT "static_pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_content" ADD CONSTRAINT "static_pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_media_block" ADD CONSTRAINT "static_pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_media_block" ADD CONSTRAINT "static_pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_grid" ADD CONSTRAINT "static_pages_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages" ADD CONSTRAINT "static_pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages" ADD CONSTRAINT "static_pages_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages_rels" ADD CONSTRAINT "static_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_rels" ADD CONSTRAINT "static_pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_rels" ADD CONSTRAINT "static_pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_rels" ADD CONSTRAINT "static_pages_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_rels" ADD CONSTRAINT "static_pages_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mux_video_playback_options" ADD CONSTRAINT "mux_video_playback_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mux_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_chips_options" ADD CONSTRAINT "forms_blocks_chips_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_chips" ADD CONSTRAINT "forms_blocks_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_static_pages_fk" FOREIGN KEY ("static_pages_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mux_video_fk" FOREIGN KEY ("mux_video_id") REFERENCES "public"."mux_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sidebar_nav_items_show_on_pages" ADD CONSTRAINT "sidebar_nav_items_show_on_pages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sidebar_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sidebar_nav_items" ADD CONSTRAINT "sidebar_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sidebar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sidebar_rels" ADD CONSTRAINT "sidebar_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sidebar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sidebar_rels" ADD CONSTRAINT "sidebar_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sidebar_rels" ADD CONSTRAINT "sidebar_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sidebar_rels" ADD CONSTRAINT "sidebar_rels_web_fk" FOREIGN KEY ("web_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sidebar_rels" ADD CONSTRAINT "sidebar_rels_content_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_content_card_media_order_idx" ON "pages_hero_content_card_media" USING btree ("_order");
  CREATE INDEX "pages_hero_content_card_media_parent_id_idx" ON "pages_hero_content_card_media" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_content_card_media_item_idx" ON "pages_hero_content_card_media" USING btree ("item_id");
  CREATE INDEX "pages_hero_content_card_footer_meta_order_idx" ON "pages_hero_content_card_footer_meta" USING btree ("_order");
  CREATE INDEX "pages_hero_content_card_footer_meta_parent_id_idx" ON "pages_hero_content_card_footer_meta" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_draggable_cards_cards_order_idx" ON "pages_hero_draggable_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_hero_draggable_cards_cards_parent_id_idx" ON "pages_hero_draggable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_draggable_cards_cards_image_idx" ON "pages_hero_draggable_cards_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_card_media_order_idx" ON "pages_blocks_content_card_media" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_card_media_parent_id_idx" ON "pages_blocks_content_card_media" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_card_media_item_idx" ON "pages_blocks_content_card_media" USING btree ("item_id");
  CREATE INDEX "pages_blocks_content_card_footer_meta_order_idx" ON "pages_blocks_content_card_footer_meta" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_card_footer_meta_parent_id_idx" ON "pages_blocks_content_card_footer_meta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_card_order_idx" ON "pages_blocks_content_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_card_parent_id_idx" ON "pages_blocks_content_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_card_path_idx" ON "pages_blocks_content_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_tech_stack_canvas_cards_order_idx" ON "pages_blocks_tech_stack_canvas_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_tech_stack_canvas_cards_parent_id_idx" ON "pages_blocks_tech_stack_canvas_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tech_stack_canvas_cards_image_idx" ON "pages_blocks_tech_stack_canvas_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_tech_stack_canvas_order_idx" ON "pages_blocks_tech_stack_canvas" USING btree ("_order");
  CREATE INDEX "pages_blocks_tech_stack_canvas_parent_id_idx" ON "pages_blocks_tech_stack_canvas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tech_stack_canvas_path_idx" ON "pages_blocks_tech_stack_canvas" USING btree ("_path");
  CREATE INDEX "pages_blocks_carousel_slides_order_idx" ON "pages_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_slides_parent_id_idx" ON "pages_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_slides_media_idx" ON "pages_blocks_carousel_slides" USING btree ("media_id");
  CREATE INDEX "pages_blocks_carousel_order_idx" ON "pages_blocks_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_carousel_parent_id_idx" ON "pages_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_carousel_path_idx" ON "pages_blocks_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_card_order_idx" ON "pages_blocks_video_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_card_parent_id_idx" ON "pages_blocks_video_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_card_path_idx" ON "pages_blocks_video_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_card_video_idx" ON "pages_blocks_video_card" USING btree ("video_id");
  CREATE INDEX "pages_blocks_video_player_order_idx" ON "pages_blocks_video_player" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_player_parent_id_idx" ON "pages_blocks_video_player" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_player_path_idx" ON "pages_blocks_video_player" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_player_poster_idx" ON "pages_blocks_video_player" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_blocks_draggable_cards_cards_order_idx" ON "pages_blocks_draggable_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_draggable_cards_cards_parent_id_idx" ON "pages_blocks_draggable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_draggable_cards_cards_image_idx" ON "pages_blocks_draggable_cards_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_draggable_cards_order_idx" ON "pages_blocks_draggable_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_draggable_cards_parent_id_idx" ON "pages_blocks_draggable_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_draggable_cards_path_idx" ON "pages_blocks_draggable_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_card_cards_order_idx" ON "pages_blocks_pricing_card_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_card_cards_parent_id_idx" ON "pages_blocks_pricing_card_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_card_order_idx" ON "pages_blocks_pricing_card" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_card_parent_id_idx" ON "pages_blocks_pricing_card" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_card_path_idx" ON "pages_blocks_pricing_card" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_grid_order_idx" ON "pages_blocks_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_grid_parent_id_idx" ON "pages_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grid_path_idx" ON "pages_blocks_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_web_id_idx" ON "pages_rels" USING btree ("web_id");
  CREATE INDEX "pages_rels_content_id_idx" ON "pages_rels" USING btree ("content_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_content_card_media_order_idx" ON "_pages_v_version_hero_content_card_media" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_content_card_media_parent_id_idx" ON "_pages_v_version_hero_content_card_media" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_content_card_media_item_idx" ON "_pages_v_version_hero_content_card_media" USING btree ("item_id");
  CREATE INDEX "_pages_v_version_hero_content_card_footer_meta_order_idx" ON "_pages_v_version_hero_content_card_footer_meta" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_content_card_footer_meta_parent_id_idx" ON "_pages_v_version_hero_content_card_footer_meta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_draggable_cards_cards_order_idx" ON "_pages_v_version_hero_draggable_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_draggable_cards_cards_parent_id_idx" ON "_pages_v_version_hero_draggable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_draggable_cards_cards_image_idx" ON "_pages_v_version_hero_draggable_cards_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_card_media_order_idx" ON "_pages_v_blocks_content_card_media" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_card_media_parent_id_idx" ON "_pages_v_blocks_content_card_media" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_card_media_item_idx" ON "_pages_v_blocks_content_card_media" USING btree ("item_id");
  CREATE INDEX "_pages_v_blocks_content_card_footer_meta_order_idx" ON "_pages_v_blocks_content_card_footer_meta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_card_footer_meta_parent_id_idx" ON "_pages_v_blocks_content_card_footer_meta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_card_order_idx" ON "_pages_v_blocks_content_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_card_parent_id_idx" ON "_pages_v_blocks_content_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_card_path_idx" ON "_pages_v_blocks_content_card" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tech_stack_canvas_cards_order_idx" ON "_pages_v_blocks_tech_stack_canvas_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tech_stack_canvas_cards_parent_id_idx" ON "_pages_v_blocks_tech_stack_canvas_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tech_stack_canvas_cards_image_idx" ON "_pages_v_blocks_tech_stack_canvas_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_tech_stack_canvas_order_idx" ON "_pages_v_blocks_tech_stack_canvas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tech_stack_canvas_parent_id_idx" ON "_pages_v_blocks_tech_stack_canvas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tech_stack_canvas_path_idx" ON "_pages_v_blocks_tech_stack_canvas" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_carousel_slides_order_idx" ON "_pages_v_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_slides_parent_id_idx" ON "_pages_v_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_slides_media_idx" ON "_pages_v_blocks_carousel_slides" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_carousel_order_idx" ON "_pages_v_blocks_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_carousel_parent_id_idx" ON "_pages_v_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_carousel_path_idx" ON "_pages_v_blocks_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_card_order_idx" ON "_pages_v_blocks_video_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_card_parent_id_idx" ON "_pages_v_blocks_video_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_card_path_idx" ON "_pages_v_blocks_video_card" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_card_video_idx" ON "_pages_v_blocks_video_card" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_video_player_order_idx" ON "_pages_v_blocks_video_player" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_player_parent_id_idx" ON "_pages_v_blocks_video_player" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_player_path_idx" ON "_pages_v_blocks_video_player" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_player_poster_idx" ON "_pages_v_blocks_video_player" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_draggable_cards_cards_order_idx" ON "_pages_v_blocks_draggable_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_draggable_cards_cards_parent_id_idx" ON "_pages_v_blocks_draggable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_draggable_cards_cards_image_idx" ON "_pages_v_blocks_draggable_cards_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_draggable_cards_order_idx" ON "_pages_v_blocks_draggable_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_draggable_cards_parent_id_idx" ON "_pages_v_blocks_draggable_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_draggable_cards_path_idx" ON "_pages_v_blocks_draggable_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_card_cards_order_idx" ON "_pages_v_blocks_pricing_card_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_card_cards_parent_id_idx" ON "_pages_v_blocks_pricing_card_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_card_order_idx" ON "_pages_v_blocks_pricing_card" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_card_parent_id_idx" ON "_pages_v_blocks_pricing_card" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_card_path_idx" ON "_pages_v_blocks_pricing_card" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_grid_order_idx" ON "_pages_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_grid_parent_id_idx" ON "_pages_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_grid_path_idx" ON "_pages_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_web_id_idx" ON "_pages_v_rels" USING btree ("web_id");
  CREATE INDEX "_pages_v_rels_content_id_idx" ON "_pages_v_rels" USING btree ("content_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "web_blocks_cta_links_order_idx" ON "web_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "web_blocks_cta_links_parent_id_idx" ON "web_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_cta_order_idx" ON "web_blocks_cta" USING btree ("_order");
  CREATE INDEX "web_blocks_cta_parent_id_idx" ON "web_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_cta_path_idx" ON "web_blocks_cta" USING btree ("_path");
  CREATE INDEX "web_blocks_content_card_media_order_idx" ON "web_blocks_content_card_media" USING btree ("_order");
  CREATE INDEX "web_blocks_content_card_media_parent_id_idx" ON "web_blocks_content_card_media" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_content_card_media_item_idx" ON "web_blocks_content_card_media" USING btree ("item_id");
  CREATE INDEX "web_blocks_content_card_footer_meta_order_idx" ON "web_blocks_content_card_footer_meta" USING btree ("_order");
  CREATE INDEX "web_blocks_content_card_footer_meta_parent_id_idx" ON "web_blocks_content_card_footer_meta" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_content_card_order_idx" ON "web_blocks_content_card" USING btree ("_order");
  CREATE INDEX "web_blocks_content_card_parent_id_idx" ON "web_blocks_content_card" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_content_card_path_idx" ON "web_blocks_content_card" USING btree ("_path");
  CREATE INDEX "web_blocks_tech_stack_canvas_cards_order_idx" ON "web_blocks_tech_stack_canvas_cards" USING btree ("_order");
  CREATE INDEX "web_blocks_tech_stack_canvas_cards_parent_id_idx" ON "web_blocks_tech_stack_canvas_cards" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_tech_stack_canvas_cards_image_idx" ON "web_blocks_tech_stack_canvas_cards" USING btree ("image_id");
  CREATE INDEX "web_blocks_tech_stack_canvas_order_idx" ON "web_blocks_tech_stack_canvas" USING btree ("_order");
  CREATE INDEX "web_blocks_tech_stack_canvas_parent_id_idx" ON "web_blocks_tech_stack_canvas" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_tech_stack_canvas_path_idx" ON "web_blocks_tech_stack_canvas" USING btree ("_path");
  CREATE INDEX "web_blocks_carousel_slides_order_idx" ON "web_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "web_blocks_carousel_slides_parent_id_idx" ON "web_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_carousel_slides_media_idx" ON "web_blocks_carousel_slides" USING btree ("media_id");
  CREATE INDEX "web_blocks_carousel_order_idx" ON "web_blocks_carousel" USING btree ("_order");
  CREATE INDEX "web_blocks_carousel_parent_id_idx" ON "web_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_carousel_path_idx" ON "web_blocks_carousel" USING btree ("_path");
  CREATE INDEX "web_blocks_video_card_order_idx" ON "web_blocks_video_card" USING btree ("_order");
  CREATE INDEX "web_blocks_video_card_parent_id_idx" ON "web_blocks_video_card" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_video_card_path_idx" ON "web_blocks_video_card" USING btree ("_path");
  CREATE INDEX "web_blocks_video_card_video_idx" ON "web_blocks_video_card" USING btree ("video_id");
  CREATE INDEX "web_blocks_video_player_order_idx" ON "web_blocks_video_player" USING btree ("_order");
  CREATE INDEX "web_blocks_video_player_parent_id_idx" ON "web_blocks_video_player" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_video_player_path_idx" ON "web_blocks_video_player" USING btree ("_path");
  CREATE INDEX "web_blocks_video_player_poster_idx" ON "web_blocks_video_player" USING btree ("poster_id");
  CREATE INDEX "web_blocks_form_block_order_idx" ON "web_blocks_form_block" USING btree ("_order");
  CREATE INDEX "web_blocks_form_block_parent_id_idx" ON "web_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_form_block_path_idx" ON "web_blocks_form_block" USING btree ("_path");
  CREATE INDEX "web_blocks_form_block_form_idx" ON "web_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "web_blocks_draggable_cards_cards_order_idx" ON "web_blocks_draggable_cards_cards" USING btree ("_order");
  CREATE INDEX "web_blocks_draggable_cards_cards_parent_id_idx" ON "web_blocks_draggable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_draggable_cards_cards_image_idx" ON "web_blocks_draggable_cards_cards" USING btree ("image_id");
  CREATE INDEX "web_blocks_draggable_cards_order_idx" ON "web_blocks_draggable_cards" USING btree ("_order");
  CREATE INDEX "web_blocks_draggable_cards_parent_id_idx" ON "web_blocks_draggable_cards" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_draggable_cards_path_idx" ON "web_blocks_draggable_cards" USING btree ("_path");
  CREATE INDEX "web_blocks_pricing_card_cards_order_idx" ON "web_blocks_pricing_card_cards" USING btree ("_order");
  CREATE INDEX "web_blocks_pricing_card_cards_parent_id_idx" ON "web_blocks_pricing_card_cards" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_pricing_card_order_idx" ON "web_blocks_pricing_card" USING btree ("_order");
  CREATE INDEX "web_blocks_pricing_card_parent_id_idx" ON "web_blocks_pricing_card" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_pricing_card_path_idx" ON "web_blocks_pricing_card" USING btree ("_path");
  CREATE INDEX "web_blocks_content_columns_order_idx" ON "web_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "web_blocks_content_columns_parent_id_idx" ON "web_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_content_order_idx" ON "web_blocks_content" USING btree ("_order");
  CREATE INDEX "web_blocks_content_parent_id_idx" ON "web_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_content_path_idx" ON "web_blocks_content" USING btree ("_path");
  CREATE INDEX "web_blocks_grid_order_idx" ON "web_blocks_grid" USING btree ("_order");
  CREATE INDEX "web_blocks_grid_parent_id_idx" ON "web_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_grid_path_idx" ON "web_blocks_grid" USING btree ("_path");
  CREATE INDEX "web_blocks_media_block_order_idx" ON "web_blocks_media_block" USING btree ("_order");
  CREATE INDEX "web_blocks_media_block_parent_id_idx" ON "web_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_media_block_path_idx" ON "web_blocks_media_block" USING btree ("_path");
  CREATE INDEX "web_blocks_media_block_media_idx" ON "web_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "web_blocks_archive_order_idx" ON "web_blocks_archive" USING btree ("_order");
  CREATE INDEX "web_blocks_archive_parent_id_idx" ON "web_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_archive_path_idx" ON "web_blocks_archive" USING btree ("_path");
  CREATE INDEX "web_blocks_image_masonry_grid_images_order_idx" ON "web_blocks_image_masonry_grid_images" USING btree ("_order");
  CREATE INDEX "web_blocks_image_masonry_grid_images_parent_id_idx" ON "web_blocks_image_masonry_grid_images" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_image_masonry_grid_images_image_idx" ON "web_blocks_image_masonry_grid_images" USING btree ("image_id");
  CREATE INDEX "web_blocks_image_masonry_grid_order_idx" ON "web_blocks_image_masonry_grid" USING btree ("_order");
  CREATE INDEX "web_blocks_image_masonry_grid_parent_id_idx" ON "web_blocks_image_masonry_grid" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_image_masonry_grid_path_idx" ON "web_blocks_image_masonry_grid" USING btree ("_path");
  CREATE INDEX "web_populated_authors_order_idx" ON "web_populated_authors" USING btree ("_order");
  CREATE INDEX "web_populated_authors_parent_id_idx" ON "web_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "web_hero_image_idx" ON "web" USING btree ("hero_image_id");
  CREATE INDEX "web_meta_meta_image_idx" ON "web" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "web_slug_idx" ON "web" USING btree ("slug");
  CREATE INDEX "web_updated_at_idx" ON "web" USING btree ("updated_at");
  CREATE INDEX "web_created_at_idx" ON "web" USING btree ("created_at");
  CREATE INDEX "web__status_idx" ON "web" USING btree ("_status");
  CREATE INDEX "web_rels_order_idx" ON "web_rels" USING btree ("order");
  CREATE INDEX "web_rels_parent_idx" ON "web_rels" USING btree ("parent_id");
  CREATE INDEX "web_rels_path_idx" ON "web_rels" USING btree ("path");
  CREATE INDEX "web_rels_pages_id_idx" ON "web_rels" USING btree ("pages_id");
  CREATE INDEX "web_rels_posts_id_idx" ON "web_rels" USING btree ("posts_id");
  CREATE INDEX "web_rels_web_id_idx" ON "web_rels" USING btree ("web_id");
  CREATE INDEX "web_rels_content_id_idx" ON "web_rels" USING btree ("content_id");
  CREATE INDEX "web_rels_categories_id_idx" ON "web_rels" USING btree ("categories_id");
  CREATE INDEX "web_rels_users_id_idx" ON "web_rels" USING btree ("users_id");
  CREATE INDEX "_web_v_blocks_cta_links_order_idx" ON "_web_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_cta_links_parent_id_idx" ON "_web_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_cta_order_idx" ON "_web_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_cta_parent_id_idx" ON "_web_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_cta_path_idx" ON "_web_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_content_card_media_order_idx" ON "_web_v_blocks_content_card_media" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_content_card_media_parent_id_idx" ON "_web_v_blocks_content_card_media" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_content_card_media_item_idx" ON "_web_v_blocks_content_card_media" USING btree ("item_id");
  CREATE INDEX "_web_v_blocks_content_card_footer_meta_order_idx" ON "_web_v_blocks_content_card_footer_meta" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_content_card_footer_meta_parent_id_idx" ON "_web_v_blocks_content_card_footer_meta" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_content_card_order_idx" ON "_web_v_blocks_content_card" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_content_card_parent_id_idx" ON "_web_v_blocks_content_card" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_content_card_path_idx" ON "_web_v_blocks_content_card" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_tech_stack_canvas_cards_order_idx" ON "_web_v_blocks_tech_stack_canvas_cards" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_tech_stack_canvas_cards_parent_id_idx" ON "_web_v_blocks_tech_stack_canvas_cards" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_tech_stack_canvas_cards_image_idx" ON "_web_v_blocks_tech_stack_canvas_cards" USING btree ("image_id");
  CREATE INDEX "_web_v_blocks_tech_stack_canvas_order_idx" ON "_web_v_blocks_tech_stack_canvas" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_tech_stack_canvas_parent_id_idx" ON "_web_v_blocks_tech_stack_canvas" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_tech_stack_canvas_path_idx" ON "_web_v_blocks_tech_stack_canvas" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_carousel_slides_order_idx" ON "_web_v_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_carousel_slides_parent_id_idx" ON "_web_v_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_carousel_slides_media_idx" ON "_web_v_blocks_carousel_slides" USING btree ("media_id");
  CREATE INDEX "_web_v_blocks_carousel_order_idx" ON "_web_v_blocks_carousel" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_carousel_parent_id_idx" ON "_web_v_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_carousel_path_idx" ON "_web_v_blocks_carousel" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_video_card_order_idx" ON "_web_v_blocks_video_card" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_video_card_parent_id_idx" ON "_web_v_blocks_video_card" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_video_card_path_idx" ON "_web_v_blocks_video_card" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_video_card_video_idx" ON "_web_v_blocks_video_card" USING btree ("video_id");
  CREATE INDEX "_web_v_blocks_video_player_order_idx" ON "_web_v_blocks_video_player" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_video_player_parent_id_idx" ON "_web_v_blocks_video_player" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_video_player_path_idx" ON "_web_v_blocks_video_player" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_video_player_poster_idx" ON "_web_v_blocks_video_player" USING btree ("poster_id");
  CREATE INDEX "_web_v_blocks_form_block_order_idx" ON "_web_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_form_block_parent_id_idx" ON "_web_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_form_block_path_idx" ON "_web_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_form_block_form_idx" ON "_web_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_web_v_blocks_draggable_cards_cards_order_idx" ON "_web_v_blocks_draggable_cards_cards" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_draggable_cards_cards_parent_id_idx" ON "_web_v_blocks_draggable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_draggable_cards_cards_image_idx" ON "_web_v_blocks_draggable_cards_cards" USING btree ("image_id");
  CREATE INDEX "_web_v_blocks_draggable_cards_order_idx" ON "_web_v_blocks_draggable_cards" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_draggable_cards_parent_id_idx" ON "_web_v_blocks_draggable_cards" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_draggable_cards_path_idx" ON "_web_v_blocks_draggable_cards" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_pricing_card_cards_order_idx" ON "_web_v_blocks_pricing_card_cards" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_pricing_card_cards_parent_id_idx" ON "_web_v_blocks_pricing_card_cards" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_pricing_card_order_idx" ON "_web_v_blocks_pricing_card" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_pricing_card_parent_id_idx" ON "_web_v_blocks_pricing_card" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_pricing_card_path_idx" ON "_web_v_blocks_pricing_card" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_content_columns_order_idx" ON "_web_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_content_columns_parent_id_idx" ON "_web_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_content_order_idx" ON "_web_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_content_parent_id_idx" ON "_web_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_content_path_idx" ON "_web_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_grid_order_idx" ON "_web_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_grid_parent_id_idx" ON "_web_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_grid_path_idx" ON "_web_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_media_block_order_idx" ON "_web_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_media_block_parent_id_idx" ON "_web_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_media_block_path_idx" ON "_web_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_media_block_media_idx" ON "_web_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_web_v_blocks_archive_order_idx" ON "_web_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_archive_parent_id_idx" ON "_web_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_archive_path_idx" ON "_web_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_image_masonry_grid_images_order_idx" ON "_web_v_blocks_image_masonry_grid_images" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_image_masonry_grid_images_parent_id_idx" ON "_web_v_blocks_image_masonry_grid_images" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_image_masonry_grid_images_image_idx" ON "_web_v_blocks_image_masonry_grid_images" USING btree ("image_id");
  CREATE INDEX "_web_v_blocks_image_masonry_grid_order_idx" ON "_web_v_blocks_image_masonry_grid" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_image_masonry_grid_parent_id_idx" ON "_web_v_blocks_image_masonry_grid" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_image_masonry_grid_path_idx" ON "_web_v_blocks_image_masonry_grid" USING btree ("_path");
  CREATE INDEX "_web_v_version_populated_authors_order_idx" ON "_web_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_web_v_version_populated_authors_parent_id_idx" ON "_web_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_web_v_parent_idx" ON "_web_v" USING btree ("parent_id");
  CREATE INDEX "_web_v_version_version_hero_image_idx" ON "_web_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_web_v_version_meta_version_meta_image_idx" ON "_web_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_web_v_version_version_slug_idx" ON "_web_v" USING btree ("version_slug");
  CREATE INDEX "_web_v_version_version_updated_at_idx" ON "_web_v" USING btree ("version_updated_at");
  CREATE INDEX "_web_v_version_version_created_at_idx" ON "_web_v" USING btree ("version_created_at");
  CREATE INDEX "_web_v_version_version__status_idx" ON "_web_v" USING btree ("version__status");
  CREATE INDEX "_web_v_created_at_idx" ON "_web_v" USING btree ("created_at");
  CREATE INDEX "_web_v_updated_at_idx" ON "_web_v" USING btree ("updated_at");
  CREATE INDEX "_web_v_latest_idx" ON "_web_v" USING btree ("latest");
  CREATE INDEX "_web_v_autosave_idx" ON "_web_v" USING btree ("autosave");
  CREATE INDEX "_web_v_rels_order_idx" ON "_web_v_rels" USING btree ("order");
  CREATE INDEX "_web_v_rels_parent_idx" ON "_web_v_rels" USING btree ("parent_id");
  CREATE INDEX "_web_v_rels_path_idx" ON "_web_v_rels" USING btree ("path");
  CREATE INDEX "_web_v_rels_pages_id_idx" ON "_web_v_rels" USING btree ("pages_id");
  CREATE INDEX "_web_v_rels_posts_id_idx" ON "_web_v_rels" USING btree ("posts_id");
  CREATE INDEX "_web_v_rels_web_id_idx" ON "_web_v_rels" USING btree ("web_id");
  CREATE INDEX "_web_v_rels_content_id_idx" ON "_web_v_rels" USING btree ("content_id");
  CREATE INDEX "_web_v_rels_categories_id_idx" ON "_web_v_rels" USING btree ("categories_id");
  CREATE INDEX "_web_v_rels_users_id_idx" ON "_web_v_rels" USING btree ("users_id");
  CREATE INDEX "content_blocks_cta_links_order_idx" ON "content_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "content_blocks_cta_links_parent_id_idx" ON "content_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_cta_order_idx" ON "content_blocks_cta" USING btree ("_order");
  CREATE INDEX "content_blocks_cta_parent_id_idx" ON "content_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_cta_path_idx" ON "content_blocks_cta" USING btree ("_path");
  CREATE INDEX "content_blocks_content_card_media_order_idx" ON "content_blocks_content_card_media" USING btree ("_order");
  CREATE INDEX "content_blocks_content_card_media_parent_id_idx" ON "content_blocks_content_card_media" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_content_card_media_item_idx" ON "content_blocks_content_card_media" USING btree ("item_id");
  CREATE INDEX "content_blocks_content_card_footer_meta_order_idx" ON "content_blocks_content_card_footer_meta" USING btree ("_order");
  CREATE INDEX "content_blocks_content_card_footer_meta_parent_id_idx" ON "content_blocks_content_card_footer_meta" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_content_card_order_idx" ON "content_blocks_content_card" USING btree ("_order");
  CREATE INDEX "content_blocks_content_card_parent_id_idx" ON "content_blocks_content_card" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_content_card_path_idx" ON "content_blocks_content_card" USING btree ("_path");
  CREATE INDEX "content_blocks_tech_stack_canvas_cards_order_idx" ON "content_blocks_tech_stack_canvas_cards" USING btree ("_order");
  CREATE INDEX "content_blocks_tech_stack_canvas_cards_parent_id_idx" ON "content_blocks_tech_stack_canvas_cards" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_tech_stack_canvas_cards_image_idx" ON "content_blocks_tech_stack_canvas_cards" USING btree ("image_id");
  CREATE INDEX "content_blocks_tech_stack_canvas_order_idx" ON "content_blocks_tech_stack_canvas" USING btree ("_order");
  CREATE INDEX "content_blocks_tech_stack_canvas_parent_id_idx" ON "content_blocks_tech_stack_canvas" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_tech_stack_canvas_path_idx" ON "content_blocks_tech_stack_canvas" USING btree ("_path");
  CREATE INDEX "content_blocks_carousel_slides_order_idx" ON "content_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "content_blocks_carousel_slides_parent_id_idx" ON "content_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_carousel_slides_media_idx" ON "content_blocks_carousel_slides" USING btree ("media_id");
  CREATE INDEX "content_blocks_carousel_order_idx" ON "content_blocks_carousel" USING btree ("_order");
  CREATE INDEX "content_blocks_carousel_parent_id_idx" ON "content_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_carousel_path_idx" ON "content_blocks_carousel" USING btree ("_path");
  CREATE INDEX "content_blocks_video_card_order_idx" ON "content_blocks_video_card" USING btree ("_order");
  CREATE INDEX "content_blocks_video_card_parent_id_idx" ON "content_blocks_video_card" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_video_card_path_idx" ON "content_blocks_video_card" USING btree ("_path");
  CREATE INDEX "content_blocks_video_card_video_idx" ON "content_blocks_video_card" USING btree ("video_id");
  CREATE INDEX "content_blocks_video_player_order_idx" ON "content_blocks_video_player" USING btree ("_order");
  CREATE INDEX "content_blocks_video_player_parent_id_idx" ON "content_blocks_video_player" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_video_player_path_idx" ON "content_blocks_video_player" USING btree ("_path");
  CREATE INDEX "content_blocks_video_player_poster_idx" ON "content_blocks_video_player" USING btree ("poster_id");
  CREATE INDEX "content_blocks_form_block_order_idx" ON "content_blocks_form_block" USING btree ("_order");
  CREATE INDEX "content_blocks_form_block_parent_id_idx" ON "content_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_form_block_path_idx" ON "content_blocks_form_block" USING btree ("_path");
  CREATE INDEX "content_blocks_form_block_form_idx" ON "content_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "content_blocks_draggable_cards_cards_order_idx" ON "content_blocks_draggable_cards_cards" USING btree ("_order");
  CREATE INDEX "content_blocks_draggable_cards_cards_parent_id_idx" ON "content_blocks_draggable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_draggable_cards_cards_image_idx" ON "content_blocks_draggable_cards_cards" USING btree ("image_id");
  CREATE INDEX "content_blocks_draggable_cards_order_idx" ON "content_blocks_draggable_cards" USING btree ("_order");
  CREATE INDEX "content_blocks_draggable_cards_parent_id_idx" ON "content_blocks_draggable_cards" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_draggable_cards_path_idx" ON "content_blocks_draggable_cards" USING btree ("_path");
  CREATE INDEX "content_blocks_pricing_card_cards_order_idx" ON "content_blocks_pricing_card_cards" USING btree ("_order");
  CREATE INDEX "content_blocks_pricing_card_cards_parent_id_idx" ON "content_blocks_pricing_card_cards" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_pricing_card_order_idx" ON "content_blocks_pricing_card" USING btree ("_order");
  CREATE INDEX "content_blocks_pricing_card_parent_id_idx" ON "content_blocks_pricing_card" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_pricing_card_path_idx" ON "content_blocks_pricing_card" USING btree ("_path");
  CREATE INDEX "content_blocks_content_columns_order_idx" ON "content_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "content_blocks_content_columns_parent_id_idx" ON "content_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_content_order_idx" ON "content_blocks_content" USING btree ("_order");
  CREATE INDEX "content_blocks_content_parent_id_idx" ON "content_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_content_path_idx" ON "content_blocks_content" USING btree ("_path");
  CREATE INDEX "content_blocks_grid_order_idx" ON "content_blocks_grid" USING btree ("_order");
  CREATE INDEX "content_blocks_grid_parent_id_idx" ON "content_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_grid_path_idx" ON "content_blocks_grid" USING btree ("_path");
  CREATE INDEX "content_blocks_media_block_order_idx" ON "content_blocks_media_block" USING btree ("_order");
  CREATE INDEX "content_blocks_media_block_parent_id_idx" ON "content_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_media_block_path_idx" ON "content_blocks_media_block" USING btree ("_path");
  CREATE INDEX "content_blocks_media_block_media_idx" ON "content_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "content_blocks_archive_order_idx" ON "content_blocks_archive" USING btree ("_order");
  CREATE INDEX "content_blocks_archive_parent_id_idx" ON "content_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_archive_path_idx" ON "content_blocks_archive" USING btree ("_path");
  CREATE INDEX "content_blocks_image_masonry_grid_images_order_idx" ON "content_blocks_image_masonry_grid_images" USING btree ("_order");
  CREATE INDEX "content_blocks_image_masonry_grid_images_parent_id_idx" ON "content_blocks_image_masonry_grid_images" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_image_masonry_grid_images_image_idx" ON "content_blocks_image_masonry_grid_images" USING btree ("image_id");
  CREATE INDEX "content_blocks_image_masonry_grid_order_idx" ON "content_blocks_image_masonry_grid" USING btree ("_order");
  CREATE INDEX "content_blocks_image_masonry_grid_parent_id_idx" ON "content_blocks_image_masonry_grid" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_image_masonry_grid_path_idx" ON "content_blocks_image_masonry_grid" USING btree ("_path");
  CREATE INDEX "content_populated_authors_order_idx" ON "content_populated_authors" USING btree ("_order");
  CREATE INDEX "content_populated_authors_parent_id_idx" ON "content_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "content_hero_image_idx" ON "content" USING btree ("hero_image_id");
  CREATE INDEX "content_meta_meta_image_idx" ON "content" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "content_slug_idx" ON "content" USING btree ("slug");
  CREATE INDEX "content_updated_at_idx" ON "content" USING btree ("updated_at");
  CREATE INDEX "content_created_at_idx" ON "content" USING btree ("created_at");
  CREATE INDEX "content__status_idx" ON "content" USING btree ("_status");
  CREATE INDEX "content_rels_order_idx" ON "content_rels" USING btree ("order");
  CREATE INDEX "content_rels_parent_idx" ON "content_rels" USING btree ("parent_id");
  CREATE INDEX "content_rels_path_idx" ON "content_rels" USING btree ("path");
  CREATE INDEX "content_rels_pages_id_idx" ON "content_rels" USING btree ("pages_id");
  CREATE INDEX "content_rels_posts_id_idx" ON "content_rels" USING btree ("posts_id");
  CREATE INDEX "content_rels_web_id_idx" ON "content_rels" USING btree ("web_id");
  CREATE INDEX "content_rels_content_id_idx" ON "content_rels" USING btree ("content_id");
  CREATE INDEX "content_rels_categories_id_idx" ON "content_rels" USING btree ("categories_id");
  CREATE INDEX "content_rels_users_id_idx" ON "content_rels" USING btree ("users_id");
  CREATE INDEX "_content_v_blocks_cta_links_order_idx" ON "_content_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_cta_links_parent_id_idx" ON "_content_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_cta_order_idx" ON "_content_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_cta_parent_id_idx" ON "_content_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_cta_path_idx" ON "_content_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_content_card_media_order_idx" ON "_content_v_blocks_content_card_media" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_content_card_media_parent_id_idx" ON "_content_v_blocks_content_card_media" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_content_card_media_item_idx" ON "_content_v_blocks_content_card_media" USING btree ("item_id");
  CREATE INDEX "_content_v_blocks_content_card_footer_meta_order_idx" ON "_content_v_blocks_content_card_footer_meta" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_content_card_footer_meta_parent_id_idx" ON "_content_v_blocks_content_card_footer_meta" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_content_card_order_idx" ON "_content_v_blocks_content_card" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_content_card_parent_id_idx" ON "_content_v_blocks_content_card" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_content_card_path_idx" ON "_content_v_blocks_content_card" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_tech_stack_canvas_cards_order_idx" ON "_content_v_blocks_tech_stack_canvas_cards" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_tech_stack_canvas_cards_parent_id_idx" ON "_content_v_blocks_tech_stack_canvas_cards" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_tech_stack_canvas_cards_image_idx" ON "_content_v_blocks_tech_stack_canvas_cards" USING btree ("image_id");
  CREATE INDEX "_content_v_blocks_tech_stack_canvas_order_idx" ON "_content_v_blocks_tech_stack_canvas" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_tech_stack_canvas_parent_id_idx" ON "_content_v_blocks_tech_stack_canvas" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_tech_stack_canvas_path_idx" ON "_content_v_blocks_tech_stack_canvas" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_carousel_slides_order_idx" ON "_content_v_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_carousel_slides_parent_id_idx" ON "_content_v_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_carousel_slides_media_idx" ON "_content_v_blocks_carousel_slides" USING btree ("media_id");
  CREATE INDEX "_content_v_blocks_carousel_order_idx" ON "_content_v_blocks_carousel" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_carousel_parent_id_idx" ON "_content_v_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_carousel_path_idx" ON "_content_v_blocks_carousel" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_video_card_order_idx" ON "_content_v_blocks_video_card" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_video_card_parent_id_idx" ON "_content_v_blocks_video_card" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_video_card_path_idx" ON "_content_v_blocks_video_card" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_video_card_video_idx" ON "_content_v_blocks_video_card" USING btree ("video_id");
  CREATE INDEX "_content_v_blocks_video_player_order_idx" ON "_content_v_blocks_video_player" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_video_player_parent_id_idx" ON "_content_v_blocks_video_player" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_video_player_path_idx" ON "_content_v_blocks_video_player" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_video_player_poster_idx" ON "_content_v_blocks_video_player" USING btree ("poster_id");
  CREATE INDEX "_content_v_blocks_form_block_order_idx" ON "_content_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_form_block_parent_id_idx" ON "_content_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_form_block_path_idx" ON "_content_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_form_block_form_idx" ON "_content_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_content_v_blocks_draggable_cards_cards_order_idx" ON "_content_v_blocks_draggable_cards_cards" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_draggable_cards_cards_parent_id_idx" ON "_content_v_blocks_draggable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_draggable_cards_cards_image_idx" ON "_content_v_blocks_draggable_cards_cards" USING btree ("image_id");
  CREATE INDEX "_content_v_blocks_draggable_cards_order_idx" ON "_content_v_blocks_draggable_cards" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_draggable_cards_parent_id_idx" ON "_content_v_blocks_draggable_cards" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_draggable_cards_path_idx" ON "_content_v_blocks_draggable_cards" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_pricing_card_cards_order_idx" ON "_content_v_blocks_pricing_card_cards" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_pricing_card_cards_parent_id_idx" ON "_content_v_blocks_pricing_card_cards" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_pricing_card_order_idx" ON "_content_v_blocks_pricing_card" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_pricing_card_parent_id_idx" ON "_content_v_blocks_pricing_card" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_pricing_card_path_idx" ON "_content_v_blocks_pricing_card" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_content_columns_order_idx" ON "_content_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_content_columns_parent_id_idx" ON "_content_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_content_order_idx" ON "_content_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_content_parent_id_idx" ON "_content_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_content_path_idx" ON "_content_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_grid_order_idx" ON "_content_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_grid_parent_id_idx" ON "_content_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_grid_path_idx" ON "_content_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_media_block_order_idx" ON "_content_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_media_block_parent_id_idx" ON "_content_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_media_block_path_idx" ON "_content_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_media_block_media_idx" ON "_content_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_content_v_blocks_archive_order_idx" ON "_content_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_archive_parent_id_idx" ON "_content_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_archive_path_idx" ON "_content_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_image_masonry_grid_images_order_idx" ON "_content_v_blocks_image_masonry_grid_images" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_image_masonry_grid_images_parent_id_idx" ON "_content_v_blocks_image_masonry_grid_images" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_image_masonry_grid_images_image_idx" ON "_content_v_blocks_image_masonry_grid_images" USING btree ("image_id");
  CREATE INDEX "_content_v_blocks_image_masonry_grid_order_idx" ON "_content_v_blocks_image_masonry_grid" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_image_masonry_grid_parent_id_idx" ON "_content_v_blocks_image_masonry_grid" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_image_masonry_grid_path_idx" ON "_content_v_blocks_image_masonry_grid" USING btree ("_path");
  CREATE INDEX "_content_v_version_populated_authors_order_idx" ON "_content_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_content_v_version_populated_authors_parent_id_idx" ON "_content_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_content_v_parent_idx" ON "_content_v" USING btree ("parent_id");
  CREATE INDEX "_content_v_version_version_hero_image_idx" ON "_content_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_content_v_version_meta_version_meta_image_idx" ON "_content_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_content_v_version_version_slug_idx" ON "_content_v" USING btree ("version_slug");
  CREATE INDEX "_content_v_version_version_updated_at_idx" ON "_content_v" USING btree ("version_updated_at");
  CREATE INDEX "_content_v_version_version_created_at_idx" ON "_content_v" USING btree ("version_created_at");
  CREATE INDEX "_content_v_version_version__status_idx" ON "_content_v" USING btree ("version__status");
  CREATE INDEX "_content_v_created_at_idx" ON "_content_v" USING btree ("created_at");
  CREATE INDEX "_content_v_updated_at_idx" ON "_content_v" USING btree ("updated_at");
  CREATE INDEX "_content_v_latest_idx" ON "_content_v" USING btree ("latest");
  CREATE INDEX "_content_v_autosave_idx" ON "_content_v" USING btree ("autosave");
  CREATE INDEX "_content_v_rels_order_idx" ON "_content_v_rels" USING btree ("order");
  CREATE INDEX "_content_v_rels_parent_idx" ON "_content_v_rels" USING btree ("parent_id");
  CREATE INDEX "_content_v_rels_path_idx" ON "_content_v_rels" USING btree ("path");
  CREATE INDEX "_content_v_rels_pages_id_idx" ON "_content_v_rels" USING btree ("pages_id");
  CREATE INDEX "_content_v_rels_posts_id_idx" ON "_content_v_rels" USING btree ("posts_id");
  CREATE INDEX "_content_v_rels_web_id_idx" ON "_content_v_rels" USING btree ("web_id");
  CREATE INDEX "_content_v_rels_content_id_idx" ON "_content_v_rels" USING btree ("content_id");
  CREATE INDEX "_content_v_rels_categories_id_idx" ON "_content_v_rels" USING btree ("categories_id");
  CREATE INDEX "_content_v_rels_users_id_idx" ON "_content_v_rels" USING btree ("users_id");
  CREATE INDEX "static_pages_blocks_rich_text_block_order_idx" ON "static_pages_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_rich_text_block_parent_id_idx" ON "static_pages_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_rich_text_block_path_idx" ON "static_pages_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_content_card_media_order_idx" ON "static_pages_blocks_content_card_media" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_content_card_media_parent_id_idx" ON "static_pages_blocks_content_card_media" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_content_card_media_item_idx" ON "static_pages_blocks_content_card_media" USING btree ("item_id");
  CREATE INDEX "static_pages_blocks_content_card_footer_meta_order_idx" ON "static_pages_blocks_content_card_footer_meta" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_content_card_footer_meta_parent_id_idx" ON "static_pages_blocks_content_card_footer_meta" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_content_card_order_idx" ON "static_pages_blocks_content_card" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_content_card_parent_id_idx" ON "static_pages_blocks_content_card" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_content_card_path_idx" ON "static_pages_blocks_content_card" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_tech_stack_canvas_cards_order_idx" ON "static_pages_blocks_tech_stack_canvas_cards" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_tech_stack_canvas_cards_parent_id_idx" ON "static_pages_blocks_tech_stack_canvas_cards" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_tech_stack_canvas_cards_image_idx" ON "static_pages_blocks_tech_stack_canvas_cards" USING btree ("image_id");
  CREATE INDEX "static_pages_blocks_tech_stack_canvas_order_idx" ON "static_pages_blocks_tech_stack_canvas" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_tech_stack_canvas_parent_id_idx" ON "static_pages_blocks_tech_stack_canvas" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_tech_stack_canvas_path_idx" ON "static_pages_blocks_tech_stack_canvas" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_carousel_slides_order_idx" ON "static_pages_blocks_carousel_slides" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_carousel_slides_parent_id_idx" ON "static_pages_blocks_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_carousel_slides_media_idx" ON "static_pages_blocks_carousel_slides" USING btree ("media_id");
  CREATE INDEX "static_pages_blocks_carousel_order_idx" ON "static_pages_blocks_carousel" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_carousel_parent_id_idx" ON "static_pages_blocks_carousel" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_carousel_path_idx" ON "static_pages_blocks_carousel" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_video_card_order_idx" ON "static_pages_blocks_video_card" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_video_card_parent_id_idx" ON "static_pages_blocks_video_card" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_video_card_path_idx" ON "static_pages_blocks_video_card" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_video_card_video_idx" ON "static_pages_blocks_video_card" USING btree ("video_id");
  CREATE INDEX "static_pages_blocks_video_player_order_idx" ON "static_pages_blocks_video_player" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_video_player_parent_id_idx" ON "static_pages_blocks_video_player" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_video_player_path_idx" ON "static_pages_blocks_video_player" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_video_player_poster_idx" ON "static_pages_blocks_video_player" USING btree ("poster_id");
  CREATE INDEX "static_pages_blocks_form_block_order_idx" ON "static_pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_form_block_parent_id_idx" ON "static_pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_form_block_path_idx" ON "static_pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_form_block_form_idx" ON "static_pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "static_pages_blocks_draggable_cards_cards_order_idx" ON "static_pages_blocks_draggable_cards_cards" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_draggable_cards_cards_parent_id_idx" ON "static_pages_blocks_draggable_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_draggable_cards_cards_image_idx" ON "static_pages_blocks_draggable_cards_cards" USING btree ("image_id");
  CREATE INDEX "static_pages_blocks_draggable_cards_order_idx" ON "static_pages_blocks_draggable_cards" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_draggable_cards_parent_id_idx" ON "static_pages_blocks_draggable_cards" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_draggable_cards_path_idx" ON "static_pages_blocks_draggable_cards" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_pricing_card_cards_order_idx" ON "static_pages_blocks_pricing_card_cards" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_pricing_card_cards_parent_id_idx" ON "static_pages_blocks_pricing_card_cards" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_pricing_card_order_idx" ON "static_pages_blocks_pricing_card" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_pricing_card_parent_id_idx" ON "static_pages_blocks_pricing_card" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_pricing_card_path_idx" ON "static_pages_blocks_pricing_card" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_content_columns_order_idx" ON "static_pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_content_columns_parent_id_idx" ON "static_pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_content_order_idx" ON "static_pages_blocks_content" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_content_parent_id_idx" ON "static_pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_content_path_idx" ON "static_pages_blocks_content" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_media_block_order_idx" ON "static_pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_media_block_parent_id_idx" ON "static_pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_media_block_path_idx" ON "static_pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_media_block_media_idx" ON "static_pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "static_pages_blocks_grid_order_idx" ON "static_pages_blocks_grid" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_grid_parent_id_idx" ON "static_pages_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_grid_path_idx" ON "static_pages_blocks_grid" USING btree ("_path");
  CREATE INDEX "static_pages_meta_meta_image_idx" ON "static_pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "static_pages_slug_idx" ON "static_pages" USING btree ("slug");
  CREATE INDEX "static_pages_featured_image_idx" ON "static_pages" USING btree ("featured_image_id");
  CREATE INDEX "static_pages_updated_at_idx" ON "static_pages" USING btree ("updated_at");
  CREATE INDEX "static_pages_created_at_idx" ON "static_pages" USING btree ("created_at");
  CREATE INDEX "static_pages_rels_order_idx" ON "static_pages_rels" USING btree ("order");
  CREATE INDEX "static_pages_rels_parent_idx" ON "static_pages_rels" USING btree ("parent_id");
  CREATE INDEX "static_pages_rels_path_idx" ON "static_pages_rels" USING btree ("path");
  CREATE INDEX "static_pages_rels_pages_id_idx" ON "static_pages_rels" USING btree ("pages_id");
  CREATE INDEX "static_pages_rels_posts_id_idx" ON "static_pages_rels" USING btree ("posts_id");
  CREATE INDEX "static_pages_rels_web_id_idx" ON "static_pages_rels" USING btree ("web_id");
  CREATE INDEX "static_pages_rels_content_id_idx" ON "static_pages_rels" USING btree ("content_id");
  CREATE INDEX "mux_video_playback_options_order_idx" ON "mux_video_playback_options" USING btree ("_order");
  CREATE INDEX "mux_video_playback_options_parent_id_idx" ON "mux_video_playback_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "mux_video_title_idx" ON "mux_video" USING btree ("title");
  CREATE INDEX "mux_video_updated_at_idx" ON "mux_video" USING btree ("updated_at");
  CREATE INDEX "mux_video_created_at_idx" ON "mux_video" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_blocks_chips_options_order_idx" ON "forms_blocks_chips_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_chips_options_parent_id_idx" ON "forms_blocks_chips_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_chips_order_idx" ON "forms_blocks_chips" USING btree ("_order");
  CREATE INDEX "forms_blocks_chips_parent_id_idx" ON "forms_blocks_chips" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_chips_path_idx" ON "forms_blocks_chips" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_web_id_idx" ON "search_rels" USING btree ("web_id");
  CREATE INDEX "search_rels_content_id_idx" ON "search_rels" USING btree ("content_id");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_web_id_idx" ON "payload_locked_documents_rels" USING btree ("web_id");
  CREATE INDEX "payload_locked_documents_rels_content_id_idx" ON "payload_locked_documents_rels" USING btree ("content_id");
  CREATE INDEX "payload_locked_documents_rels_static_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("static_pages_id");
  CREATE INDEX "payload_locked_documents_rels_mux_video_id_idx" ON "payload_locked_documents_rels" USING btree ("mux_video_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "header_rels_web_id_idx" ON "header_rels" USING btree ("web_id");
  CREATE INDEX "header_rels_content_id_idx" ON "header_rels" USING btree ("content_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_web_id_idx" ON "footer_rels" USING btree ("web_id");
  CREATE INDEX "footer_rels_content_id_idx" ON "footer_rels" USING btree ("content_id");
  CREATE INDEX "sidebar_nav_items_show_on_pages_order_idx" ON "sidebar_nav_items_show_on_pages" USING btree ("_order");
  CREATE INDEX "sidebar_nav_items_show_on_pages_parent_id_idx" ON "sidebar_nav_items_show_on_pages" USING btree ("_parent_id");
  CREATE INDEX "sidebar_nav_items_order_idx" ON "sidebar_nav_items" USING btree ("_order");
  CREATE INDEX "sidebar_nav_items_parent_id_idx" ON "sidebar_nav_items" USING btree ("_parent_id");
  CREATE INDEX "sidebar_rels_order_idx" ON "sidebar_rels" USING btree ("order");
  CREATE INDEX "sidebar_rels_parent_idx" ON "sidebar_rels" USING btree ("parent_id");
  CREATE INDEX "sidebar_rels_path_idx" ON "sidebar_rels" USING btree ("path");
  CREATE INDEX "sidebar_rels_pages_id_idx" ON "sidebar_rels" USING btree ("pages_id");
  CREATE INDEX "sidebar_rels_posts_id_idx" ON "sidebar_rels" USING btree ("posts_id");
  CREATE INDEX "sidebar_rels_web_id_idx" ON "sidebar_rels" USING btree ("web_id");
  CREATE INDEX "sidebar_rels_content_id_idx" ON "sidebar_rels" USING btree ("content_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_hero_content_card_media" CASCADE;
  DROP TABLE "pages_hero_content_card_footer_meta" CASCADE;
  DROP TABLE "pages_hero_draggable_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_content_card_media" CASCADE;
  DROP TABLE "pages_blocks_content_card_footer_meta" CASCADE;
  DROP TABLE "pages_blocks_content_card" CASCADE;
  DROP TABLE "pages_blocks_tech_stack_canvas_cards" CASCADE;
  DROP TABLE "pages_blocks_tech_stack_canvas" CASCADE;
  DROP TABLE "pages_blocks_carousel_slides" CASCADE;
  DROP TABLE "pages_blocks_carousel" CASCADE;
  DROP TABLE "pages_blocks_video_card" CASCADE;
  DROP TABLE "pages_blocks_video_player" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_blocks_draggable_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_draggable_cards" CASCADE;
  DROP TABLE "pages_blocks_pricing_card_cards" CASCADE;
  DROP TABLE "pages_blocks_pricing_card" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_grid" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_version_hero_content_card_media" CASCADE;
  DROP TABLE "_pages_v_version_hero_content_card_footer_meta" CASCADE;
  DROP TABLE "_pages_v_version_hero_draggable_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_content_card_media" CASCADE;
  DROP TABLE "_pages_v_blocks_content_card_footer_meta" CASCADE;
  DROP TABLE "_pages_v_blocks_content_card" CASCADE;
  DROP TABLE "_pages_v_blocks_tech_stack_canvas_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_tech_stack_canvas" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_video_card" CASCADE;
  DROP TABLE "_pages_v_blocks_video_player" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_draggable_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_draggable_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_card_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_card" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "web_blocks_cta_links" CASCADE;
  DROP TABLE "web_blocks_cta" CASCADE;
  DROP TABLE "web_blocks_content_card_media" CASCADE;
  DROP TABLE "web_blocks_content_card_footer_meta" CASCADE;
  DROP TABLE "web_blocks_content_card" CASCADE;
  DROP TABLE "web_blocks_tech_stack_canvas_cards" CASCADE;
  DROP TABLE "web_blocks_tech_stack_canvas" CASCADE;
  DROP TABLE "web_blocks_carousel_slides" CASCADE;
  DROP TABLE "web_blocks_carousel" CASCADE;
  DROP TABLE "web_blocks_video_card" CASCADE;
  DROP TABLE "web_blocks_video_player" CASCADE;
  DROP TABLE "web_blocks_form_block" CASCADE;
  DROP TABLE "web_blocks_draggable_cards_cards" CASCADE;
  DROP TABLE "web_blocks_draggable_cards" CASCADE;
  DROP TABLE "web_blocks_pricing_card_cards" CASCADE;
  DROP TABLE "web_blocks_pricing_card" CASCADE;
  DROP TABLE "web_blocks_content_columns" CASCADE;
  DROP TABLE "web_blocks_content" CASCADE;
  DROP TABLE "web_blocks_grid" CASCADE;
  DROP TABLE "web_blocks_media_block" CASCADE;
  DROP TABLE "web_blocks_archive" CASCADE;
  DROP TABLE "web_blocks_image_masonry_grid_images" CASCADE;
  DROP TABLE "web_blocks_image_masonry_grid" CASCADE;
  DROP TABLE "web_populated_authors" CASCADE;
  DROP TABLE "web" CASCADE;
  DROP TABLE "web_rels" CASCADE;
  DROP TABLE "_web_v_blocks_cta_links" CASCADE;
  DROP TABLE "_web_v_blocks_cta" CASCADE;
  DROP TABLE "_web_v_blocks_content_card_media" CASCADE;
  DROP TABLE "_web_v_blocks_content_card_footer_meta" CASCADE;
  DROP TABLE "_web_v_blocks_content_card" CASCADE;
  DROP TABLE "_web_v_blocks_tech_stack_canvas_cards" CASCADE;
  DROP TABLE "_web_v_blocks_tech_stack_canvas" CASCADE;
  DROP TABLE "_web_v_blocks_carousel_slides" CASCADE;
  DROP TABLE "_web_v_blocks_carousel" CASCADE;
  DROP TABLE "_web_v_blocks_video_card" CASCADE;
  DROP TABLE "_web_v_blocks_video_player" CASCADE;
  DROP TABLE "_web_v_blocks_form_block" CASCADE;
  DROP TABLE "_web_v_blocks_draggable_cards_cards" CASCADE;
  DROP TABLE "_web_v_blocks_draggable_cards" CASCADE;
  DROP TABLE "_web_v_blocks_pricing_card_cards" CASCADE;
  DROP TABLE "_web_v_blocks_pricing_card" CASCADE;
  DROP TABLE "_web_v_blocks_content_columns" CASCADE;
  DROP TABLE "_web_v_blocks_content" CASCADE;
  DROP TABLE "_web_v_blocks_grid" CASCADE;
  DROP TABLE "_web_v_blocks_media_block" CASCADE;
  DROP TABLE "_web_v_blocks_archive" CASCADE;
  DROP TABLE "_web_v_blocks_image_masonry_grid_images" CASCADE;
  DROP TABLE "_web_v_blocks_image_masonry_grid" CASCADE;
  DROP TABLE "_web_v_version_populated_authors" CASCADE;
  DROP TABLE "_web_v" CASCADE;
  DROP TABLE "_web_v_rels" CASCADE;
  DROP TABLE "content_blocks_cta_links" CASCADE;
  DROP TABLE "content_blocks_cta" CASCADE;
  DROP TABLE "content_blocks_content_card_media" CASCADE;
  DROP TABLE "content_blocks_content_card_footer_meta" CASCADE;
  DROP TABLE "content_blocks_content_card" CASCADE;
  DROP TABLE "content_blocks_tech_stack_canvas_cards" CASCADE;
  DROP TABLE "content_blocks_tech_stack_canvas" CASCADE;
  DROP TABLE "content_blocks_carousel_slides" CASCADE;
  DROP TABLE "content_blocks_carousel" CASCADE;
  DROP TABLE "content_blocks_video_card" CASCADE;
  DROP TABLE "content_blocks_video_player" CASCADE;
  DROP TABLE "content_blocks_form_block" CASCADE;
  DROP TABLE "content_blocks_draggable_cards_cards" CASCADE;
  DROP TABLE "content_blocks_draggable_cards" CASCADE;
  DROP TABLE "content_blocks_pricing_card_cards" CASCADE;
  DROP TABLE "content_blocks_pricing_card" CASCADE;
  DROP TABLE "content_blocks_content_columns" CASCADE;
  DROP TABLE "content_blocks_content" CASCADE;
  DROP TABLE "content_blocks_grid" CASCADE;
  DROP TABLE "content_blocks_media_block" CASCADE;
  DROP TABLE "content_blocks_archive" CASCADE;
  DROP TABLE "content_blocks_image_masonry_grid_images" CASCADE;
  DROP TABLE "content_blocks_image_masonry_grid" CASCADE;
  DROP TABLE "content_populated_authors" CASCADE;
  DROP TABLE "content" CASCADE;
  DROP TABLE "content_rels" CASCADE;
  DROP TABLE "_content_v_blocks_cta_links" CASCADE;
  DROP TABLE "_content_v_blocks_cta" CASCADE;
  DROP TABLE "_content_v_blocks_content_card_media" CASCADE;
  DROP TABLE "_content_v_blocks_content_card_footer_meta" CASCADE;
  DROP TABLE "_content_v_blocks_content_card" CASCADE;
  DROP TABLE "_content_v_blocks_tech_stack_canvas_cards" CASCADE;
  DROP TABLE "_content_v_blocks_tech_stack_canvas" CASCADE;
  DROP TABLE "_content_v_blocks_carousel_slides" CASCADE;
  DROP TABLE "_content_v_blocks_carousel" CASCADE;
  DROP TABLE "_content_v_blocks_video_card" CASCADE;
  DROP TABLE "_content_v_blocks_video_player" CASCADE;
  DROP TABLE "_content_v_blocks_form_block" CASCADE;
  DROP TABLE "_content_v_blocks_draggable_cards_cards" CASCADE;
  DROP TABLE "_content_v_blocks_draggable_cards" CASCADE;
  DROP TABLE "_content_v_blocks_pricing_card_cards" CASCADE;
  DROP TABLE "_content_v_blocks_pricing_card" CASCADE;
  DROP TABLE "_content_v_blocks_content_columns" CASCADE;
  DROP TABLE "_content_v_blocks_content" CASCADE;
  DROP TABLE "_content_v_blocks_grid" CASCADE;
  DROP TABLE "_content_v_blocks_media_block" CASCADE;
  DROP TABLE "_content_v_blocks_archive" CASCADE;
  DROP TABLE "_content_v_blocks_image_masonry_grid_images" CASCADE;
  DROP TABLE "_content_v_blocks_image_masonry_grid" CASCADE;
  DROP TABLE "_content_v_version_populated_authors" CASCADE;
  DROP TABLE "_content_v" CASCADE;
  DROP TABLE "_content_v_rels" CASCADE;
  DROP TABLE "static_pages_blocks_rich_text_block" CASCADE;
  DROP TABLE "static_pages_blocks_content_card_media" CASCADE;
  DROP TABLE "static_pages_blocks_content_card_footer_meta" CASCADE;
  DROP TABLE "static_pages_blocks_content_card" CASCADE;
  DROP TABLE "static_pages_blocks_tech_stack_canvas_cards" CASCADE;
  DROP TABLE "static_pages_blocks_tech_stack_canvas" CASCADE;
  DROP TABLE "static_pages_blocks_carousel_slides" CASCADE;
  DROP TABLE "static_pages_blocks_carousel" CASCADE;
  DROP TABLE "static_pages_blocks_video_card" CASCADE;
  DROP TABLE "static_pages_blocks_video_player" CASCADE;
  DROP TABLE "static_pages_blocks_form_block" CASCADE;
  DROP TABLE "static_pages_blocks_draggable_cards_cards" CASCADE;
  DROP TABLE "static_pages_blocks_draggable_cards" CASCADE;
  DROP TABLE "static_pages_blocks_pricing_card_cards" CASCADE;
  DROP TABLE "static_pages_blocks_pricing_card" CASCADE;
  DROP TABLE "static_pages_blocks_content_columns" CASCADE;
  DROP TABLE "static_pages_blocks_content" CASCADE;
  DROP TABLE "static_pages_blocks_media_block" CASCADE;
  DROP TABLE "static_pages_blocks_grid" CASCADE;
  DROP TABLE "static_pages" CASCADE;
  DROP TABLE "static_pages_rels" CASCADE;
  DROP TABLE "mux_video_playback_options" CASCADE;
  DROP TABLE "mux_video" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_chips_options" CASCADE;
  DROP TABLE "forms_blocks_chips" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "sidebar_nav_items_show_on_pages" CASCADE;
  DROP TABLE "sidebar_nav_items" CASCADE;
  DROP TABLE "sidebar" CASCADE;
  DROP TABLE "sidebar_rels" CASCADE;
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_hero_links_link_size";
  DROP TYPE "public"."enum_pages_hero_draggable_cards_cards_size";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_size";
  DROP TYPE "public"."enum_pages_blocks_content_card_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_content_card_link_type";
  DROP TYPE "public"."enum_pages_blocks_tech_stack_canvas_cards_category";
  DROP TYPE "public"."enum_pages_blocks_tech_stack_canvas_cards_size";
  DROP TYPE "public"."enum_pages_blocks_tech_stack_canvas_container_width";
  DROP TYPE "public"."enum_pages_blocks_video_card_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_video_card_link_type";
  DROP TYPE "public"."enum_pages_blocks_video_player_video_type";
  DROP TYPE "public"."enum_pages_blocks_draggable_cards_cards_category";
  DROP TYPE "public"."enum_pages_blocks_draggable_cards_cards_size";
  DROP TYPE "public"."enum_pages_blocks_draggable_cards_container_width";
  DROP TYPE "public"."enum_pages_blocks_pricing_card_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_pricing_card_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_pricing_card_cards_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_pricing_card_cards_link_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_size";
  DROP TYPE "public"."enum_pages_blocks_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_hero_content_card_aspect_ratio";
  DROP TYPE "public"."enum_pages_hero_content_card_link_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_size";
  DROP TYPE "public"."enum__pages_v_version_hero_draggable_cards_cards_size";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_card_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_content_card_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_tech_stack_canvas_cards_category";
  DROP TYPE "public"."enum__pages_v_blocks_tech_stack_canvas_cards_size";
  DROP TYPE "public"."enum__pages_v_blocks_tech_stack_canvas_container_width";
  DROP TYPE "public"."enum__pages_v_blocks_video_card_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_video_card_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_video_player_video_type";
  DROP TYPE "public"."enum__pages_v_blocks_draggable_cards_cards_category";
  DROP TYPE "public"."enum__pages_v_blocks_draggable_cards_cards_size";
  DROP TYPE "public"."enum__pages_v_blocks_draggable_cards_container_width";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_card_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_card_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_card_cards_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_pricing_card_cards_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_hero_content_card_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_version_hero_content_card_link_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_web_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_web_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_web_blocks_cta_links_link_size";
  DROP TYPE "public"."enum_web_blocks_content_card_aspect_ratio";
  DROP TYPE "public"."enum_web_blocks_content_card_link_type";
  DROP TYPE "public"."enum_web_blocks_tech_stack_canvas_cards_category";
  DROP TYPE "public"."enum_web_blocks_tech_stack_canvas_cards_size";
  DROP TYPE "public"."enum_web_blocks_tech_stack_canvas_container_width";
  DROP TYPE "public"."enum_web_blocks_video_card_aspect_ratio";
  DROP TYPE "public"."enum_web_blocks_video_card_link_type";
  DROP TYPE "public"."enum_web_blocks_video_player_video_type";
  DROP TYPE "public"."enum_web_blocks_draggable_cards_cards_category";
  DROP TYPE "public"."enum_web_blocks_draggable_cards_cards_size";
  DROP TYPE "public"."enum_web_blocks_draggable_cards_container_width";
  DROP TYPE "public"."enum_web_blocks_pricing_card_cards_icon";
  DROP TYPE "public"."enum_web_blocks_pricing_card_cards_link_type";
  DROP TYPE "public"."enum_web_blocks_pricing_card_cards_link_appearance";
  DROP TYPE "public"."enum_web_blocks_pricing_card_cards_link_size";
  DROP TYPE "public"."enum_web_blocks_content_columns_size";
  DROP TYPE "public"."enum_web_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_web_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_web_blocks_content_columns_link_size";
  DROP TYPE "public"."enum_web_blocks_grid_columns";
  DROP TYPE "public"."enum_web_blocks_archive_populate_by";
  DROP TYPE "public"."enum_web_blocks_archive_relation_to";
  DROP TYPE "public"."enum_web_blocks_image_masonry_grid_gap";
  DROP TYPE "public"."enum_web_status";
  DROP TYPE "public"."enum__web_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__web_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__web_v_blocks_cta_links_link_size";
  DROP TYPE "public"."enum__web_v_blocks_content_card_aspect_ratio";
  DROP TYPE "public"."enum__web_v_blocks_content_card_link_type";
  DROP TYPE "public"."enum__web_v_blocks_tech_stack_canvas_cards_category";
  DROP TYPE "public"."enum__web_v_blocks_tech_stack_canvas_cards_size";
  DROP TYPE "public"."enum__web_v_blocks_tech_stack_canvas_container_width";
  DROP TYPE "public"."enum__web_v_blocks_video_card_aspect_ratio";
  DROP TYPE "public"."enum__web_v_blocks_video_card_link_type";
  DROP TYPE "public"."enum__web_v_blocks_video_player_video_type";
  DROP TYPE "public"."enum__web_v_blocks_draggable_cards_cards_category";
  DROP TYPE "public"."enum__web_v_blocks_draggable_cards_cards_size";
  DROP TYPE "public"."enum__web_v_blocks_draggable_cards_container_width";
  DROP TYPE "public"."enum__web_v_blocks_pricing_card_cards_icon";
  DROP TYPE "public"."enum__web_v_blocks_pricing_card_cards_link_type";
  DROP TYPE "public"."enum__web_v_blocks_pricing_card_cards_link_appearance";
  DROP TYPE "public"."enum__web_v_blocks_pricing_card_cards_link_size";
  DROP TYPE "public"."enum__web_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__web_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__web_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__web_v_blocks_content_columns_link_size";
  DROP TYPE "public"."enum__web_v_blocks_grid_columns";
  DROP TYPE "public"."enum__web_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__web_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__web_v_blocks_image_masonry_grid_gap";
  DROP TYPE "public"."enum__web_v_version_status";
  DROP TYPE "public"."enum_content_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_content_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_content_blocks_cta_links_link_size";
  DROP TYPE "public"."enum_content_blocks_content_card_aspect_ratio";
  DROP TYPE "public"."enum_content_blocks_content_card_link_type";
  DROP TYPE "public"."enum_content_blocks_tech_stack_canvas_cards_category";
  DROP TYPE "public"."enum_content_blocks_tech_stack_canvas_cards_size";
  DROP TYPE "public"."enum_content_blocks_tech_stack_canvas_container_width";
  DROP TYPE "public"."enum_content_blocks_video_card_aspect_ratio";
  DROP TYPE "public"."enum_content_blocks_video_card_link_type";
  DROP TYPE "public"."enum_content_blocks_video_player_video_type";
  DROP TYPE "public"."enum_content_blocks_draggable_cards_cards_category";
  DROP TYPE "public"."enum_content_blocks_draggable_cards_cards_size";
  DROP TYPE "public"."enum_content_blocks_draggable_cards_container_width";
  DROP TYPE "public"."enum_content_blocks_pricing_card_cards_icon";
  DROP TYPE "public"."enum_content_blocks_pricing_card_cards_link_type";
  DROP TYPE "public"."enum_content_blocks_pricing_card_cards_link_appearance";
  DROP TYPE "public"."enum_content_blocks_pricing_card_cards_link_size";
  DROP TYPE "public"."enum_content_blocks_content_columns_size";
  DROP TYPE "public"."enum_content_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_content_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_content_blocks_content_columns_link_size";
  DROP TYPE "public"."enum_content_blocks_grid_columns";
  DROP TYPE "public"."enum_content_blocks_archive_populate_by";
  DROP TYPE "public"."enum_content_blocks_archive_relation_to";
  DROP TYPE "public"."enum_content_blocks_image_masonry_grid_gap";
  DROP TYPE "public"."enum_content_project_type";
  DROP TYPE "public"."enum_content_status";
  DROP TYPE "public"."enum__content_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__content_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__content_v_blocks_cta_links_link_size";
  DROP TYPE "public"."enum__content_v_blocks_content_card_aspect_ratio";
  DROP TYPE "public"."enum__content_v_blocks_content_card_link_type";
  DROP TYPE "public"."enum__content_v_blocks_tech_stack_canvas_cards_category";
  DROP TYPE "public"."enum__content_v_blocks_tech_stack_canvas_cards_size";
  DROP TYPE "public"."enum__content_v_blocks_tech_stack_canvas_container_width";
  DROP TYPE "public"."enum__content_v_blocks_video_card_aspect_ratio";
  DROP TYPE "public"."enum__content_v_blocks_video_card_link_type";
  DROP TYPE "public"."enum__content_v_blocks_video_player_video_type";
  DROP TYPE "public"."enum__content_v_blocks_draggable_cards_cards_category";
  DROP TYPE "public"."enum__content_v_blocks_draggable_cards_cards_size";
  DROP TYPE "public"."enum__content_v_blocks_draggable_cards_container_width";
  DROP TYPE "public"."enum__content_v_blocks_pricing_card_cards_icon";
  DROP TYPE "public"."enum__content_v_blocks_pricing_card_cards_link_type";
  DROP TYPE "public"."enum__content_v_blocks_pricing_card_cards_link_appearance";
  DROP TYPE "public"."enum__content_v_blocks_pricing_card_cards_link_size";
  DROP TYPE "public"."enum__content_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__content_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__content_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__content_v_blocks_content_columns_link_size";
  DROP TYPE "public"."enum__content_v_blocks_grid_columns";
  DROP TYPE "public"."enum__content_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__content_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__content_v_blocks_image_masonry_grid_gap";
  DROP TYPE "public"."enum__content_v_version_project_type";
  DROP TYPE "public"."enum__content_v_version_status";
  DROP TYPE "public"."enum_static_pages_blocks_content_card_aspect_ratio";
  DROP TYPE "public"."enum_static_pages_blocks_content_card_link_type";
  DROP TYPE "public"."enum_static_pages_blocks_tech_stack_canvas_cards_category";
  DROP TYPE "public"."enum_static_pages_blocks_tech_stack_canvas_cards_size";
  DROP TYPE "public"."enum_static_pages_blocks_tech_stack_canvas_container_width";
  DROP TYPE "public"."enum_static_pages_blocks_video_card_aspect_ratio";
  DROP TYPE "public"."enum_static_pages_blocks_video_card_link_type";
  DROP TYPE "public"."enum_static_pages_blocks_video_player_video_type";
  DROP TYPE "public"."enum_static_pages_blocks_draggable_cards_cards_category";
  DROP TYPE "public"."enum_static_pages_blocks_draggable_cards_cards_size";
  DROP TYPE "public"."enum_static_pages_blocks_draggable_cards_container_width";
  DROP TYPE "public"."enum_static_pages_blocks_pricing_card_cards_icon";
  DROP TYPE "public"."enum_static_pages_blocks_pricing_card_cards_link_type";
  DROP TYPE "public"."enum_static_pages_blocks_pricing_card_cards_link_appearance";
  DROP TYPE "public"."enum_static_pages_blocks_pricing_card_cards_link_size";
  DROP TYPE "public"."enum_static_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_static_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_static_pages_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_static_pages_blocks_content_columns_link_size";
  DROP TYPE "public"."enum_static_pages_blocks_grid_columns";
  DROP TYPE "public"."enum_mux_video_playback_options_playback_policy";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_blocks_chips_options_icon";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_appearance";
  DROP TYPE "public"."enum_header_nav_items_link_size";
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  DROP TYPE "public"."enum_footer_nav_items_link_size";
  DROP TYPE "public"."enum_sidebar_nav_items_link_type";
  DROP TYPE "public"."enum_sidebar_nav_items_link_appearance";
  DROP TYPE "public"."enum_sidebar_nav_items_link_size";
  DROP TYPE "public"."enum_sidebar_nav_items_link_icon";`)
}
