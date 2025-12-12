import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_bento_c_t_a_quotes_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum_pages_blocks_bento_c_t_a_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_bento_c_t_a_cta_link_appearance" AS ENUM('default', 'outline', 'white');
  CREATE TYPE "public"."enum_pages_blocks_bento_c_t_a_cta_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum__pages_v_blocks_bento_c_t_a_quotes_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum__pages_v_blocks_bento_c_t_a_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_bento_c_t_a_cta_link_appearance" AS ENUM('default', 'outline', 'white');
  CREATE TYPE "public"."enum__pages_v_blocks_bento_c_t_a_cta_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_web_blocks_bento_c_t_a_quotes_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum_web_blocks_bento_c_t_a_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_web_blocks_bento_c_t_a_cta_link_appearance" AS ENUM('default', 'outline', 'white');
  CREATE TYPE "public"."enum_web_blocks_bento_c_t_a_cta_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum__web_v_blocks_bento_c_t_a_quotes_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum__web_v_blocks_bento_c_t_a_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__web_v_blocks_bento_c_t_a_cta_link_appearance" AS ENUM('default', 'outline', 'white');
  CREATE TYPE "public"."enum__web_v_blocks_bento_c_t_a_cta_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_content_blocks_bento_c_t_a_quotes_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum_content_blocks_bento_c_t_a_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_content_blocks_bento_c_t_a_cta_link_appearance" AS ENUM('default', 'outline', 'white');
  CREATE TYPE "public"."enum_content_blocks_bento_c_t_a_cta_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum__content_v_blocks_bento_c_t_a_quotes_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum__content_v_blocks_bento_c_t_a_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__content_v_blocks_bento_c_t_a_cta_link_appearance" AS ENUM('default', 'outline', 'white');
  CREATE TYPE "public"."enum__content_v_blocks_bento_c_t_a_cta_link_size" AS ENUM('default');
  CREATE TYPE "public"."enum_static_pages_blocks_bento_c_t_a_quotes_icon" AS ENUM('AcademicCapIcon', 'AdjustmentsHorizontalIcon', 'AdjustmentsVerticalIcon', 'ArchiveBoxArrowDownIcon', 'ArchiveBoxXMarkIcon', 'ArchiveBoxIcon', 'ArrowDownCircleIcon', 'ArrowDownLeftIcon', 'ArrowDownOnSquareStackIcon', 'ArrowDownOnSquareIcon', 'ArrowDownRightIcon', 'ArrowDownTrayIcon', 'ArrowDownIcon', 'ArrowLeftCircleIcon', 'ArrowLeftEndOnRectangleIcon', 'ArrowLeftOnRectangleIcon', 'ArrowLeftStartOnRectangleIcon', 'ArrowLeftIcon', 'ArrowLongDownIcon', 'ArrowLongLeftIcon', 'ArrowLongRightIcon', 'ArrowLongUpIcon', 'ArrowPathRoundedSquareIcon', 'ArrowPathIcon', 'ArrowRightCircleIcon', 'ArrowRightEndOnRectangleIcon', 'ArrowRightOnRectangleIcon', 'ArrowRightStartOnRectangleIcon', 'ArrowRightIcon', 'ArrowSmallDownIcon', 'ArrowSmallLeftIcon', 'ArrowSmallRightIcon', 'ArrowSmallUpIcon', 'ArrowTopRightOnSquareIcon', 'ArrowTrendingDownIcon', 'ArrowTrendingUpIcon', 'ArrowTurnDownLeftIcon', 'ArrowTurnDownRightIcon', 'ArrowTurnLeftDownIcon', 'ArrowTurnLeftUpIcon', 'ArrowTurnRightDownIcon', 'ArrowTurnRightUpIcon', 'ArrowTurnUpLeftIcon', 'ArrowTurnUpRightIcon', 'ArrowUpCircleIcon', 'ArrowUpLeftIcon', 'ArrowUpOnSquareStackIcon', 'ArrowUpOnSquareIcon', 'ArrowUpRightIcon', 'ArrowUpTrayIcon', 'ArrowUpIcon', 'ArrowUturnDownIcon', 'ArrowUturnLeftIcon', 'ArrowUturnRightIcon', 'ArrowUturnUpIcon', 'ArrowsPointingInIcon', 'ArrowsPointingOutIcon', 'ArrowsRightLeftIcon', 'ArrowsUpDownIcon', 'AtSymbolIcon', 'BackspaceIcon', 'BackwardIcon', 'BanknotesIcon', 'Bars2Icon', 'Bars3BottomLeftIcon', 'Bars3BottomRightIcon', 'Bars3CenterLeftIcon', 'Bars3Icon', 'Bars4Icon', 'BarsArrowDownIcon', 'BarsArrowUpIcon', 'Battery0Icon', 'Battery100Icon', 'Battery50Icon', 'BeakerIcon', 'BellAlertIcon', 'BellSlashIcon', 'BellSnoozeIcon', 'BellIcon', 'BoldIcon', 'BoltSlashIcon', 'BoltIcon', 'BookOpenIcon', 'BookmarkSlashIcon', 'BookmarkSquareIcon', 'BookmarkIcon', 'BriefcaseIcon', 'BugAntIcon', 'BuildingLibraryIcon', 'BuildingOffice2Icon', 'BuildingOfficeIcon', 'BuildingStorefrontIcon', 'CakeIcon', 'CalculatorIcon', 'CalendarDateRangeIcon', 'CalendarDaysIcon', 'CalendarIcon', 'CameraIcon', 'ChartBarSquareIcon', 'ChartBarIcon', 'ChartPieIcon', 'ChatBubbleBottomCenterTextIcon', 'ChatBubbleBottomCenterIcon', 'ChatBubbleLeftEllipsisIcon', 'ChatBubbleLeftRightIcon', 'ChatBubbleLeftIcon', 'ChatBubbleOvalLeftEllipsisIcon', 'ChatBubbleOvalLeftIcon', 'CheckBadgeIcon', 'CheckCircleIcon', 'CheckIcon', 'ChevronDoubleDownIcon', 'ChevronDoubleLeftIcon', 'ChevronDoubleRightIcon', 'ChevronDoubleUpIcon', 'ChevronDownIcon', 'ChevronLeftIcon', 'ChevronRightIcon', 'ChevronUpDownIcon', 'ChevronUpIcon', 'CircleStackIcon', 'ClipboardDocumentCheckIcon', 'ClipboardDocumentListIcon', 'ClipboardDocumentIcon', 'ClipboardIcon', 'ClockIcon', 'CloudArrowDownIcon', 'CloudArrowUpIcon', 'CloudIcon', 'CodeBracketSquareIcon', 'CodeBracketIcon', 'Cog6ToothIcon', 'Cog8ToothIcon', 'CogIcon', 'CommandLineIcon', 'ComputerDesktopIcon', 'CpuChipIcon', 'CreditCardIcon', 'CubeTransparentIcon', 'CubeIcon', 'CurrencyBangladeshiIcon', 'CurrencyDollarIcon', 'CurrencyEuroIcon', 'CurrencyPoundIcon', 'CurrencyRupeeIcon', 'CurrencyYenIcon', 'CursorArrowRaysIcon', 'CursorArrowRippleIcon', 'DevicePhoneMobileIcon', 'DeviceTabletIcon', 'DivideIcon', 'DocumentArrowDownIcon', 'DocumentArrowUpIcon', 'DocumentChartBarIcon', 'DocumentCheckIcon', 'DocumentCurrencyBangladeshiIcon', 'DocumentCurrencyDollarIcon', 'DocumentCurrencyEuroIcon', 'DocumentCurrencyPoundIcon', 'DocumentCurrencyRupeeIcon', 'DocumentCurrencyYenIcon', 'DocumentDuplicateIcon', 'DocumentMagnifyingGlassIcon', 'DocumentMinusIcon', 'DocumentPlusIcon', 'DocumentTextIcon', 'DocumentIcon', 'EllipsisHorizontalCircleIcon', 'EllipsisHorizontalIcon', 'EllipsisVerticalIcon', 'EnvelopeOpenIcon', 'EnvelopeIcon', 'EqualsIcon', 'ExclamationCircleIcon', 'ExclamationTriangleIcon', 'EyeDropperIcon', 'EyeSlashIcon', 'EyeIcon', 'FaceFrownIcon', 'FaceSmileIcon', 'FilmIcon', 'FingerPrintIcon', 'FireIcon', 'FlagIcon', 'FolderArrowDownIcon', 'FolderMinusIcon', 'FolderOpenIcon', 'FolderPlusIcon', 'FolderIcon', 'ForwardIcon', 'FunnelIcon', 'GifIcon', 'GiftTopIcon', 'GiftIcon', 'GlobeAltIcon', 'GlobeAmericasIcon', 'GlobeAsiaAustraliaIcon', 'GlobeEuropeAfricaIcon', 'H1Icon', 'H2Icon', 'H3Icon', 'HandRaisedIcon', 'HandThumbDownIcon', 'HandThumbUpIcon', 'HashtagIcon', 'HeartIcon', 'HomeModernIcon', 'HomeIcon', 'IdentificationIcon', 'InboxArrowDownIcon', 'InboxStackIcon', 'InboxIcon', 'InformationCircleIcon', 'ItalicIcon', 'KeyIcon', 'LanguageIcon', 'LifebuoyIcon', 'LightBulbIcon', 'LinkSlashIcon', 'LinkIcon', 'ListBulletIcon', 'LockClosedIcon', 'LockOpenIcon', 'MagnifyingGlassCircleIcon', 'MagnifyingGlassMinusIcon', 'MagnifyingGlassPlusIcon', 'MagnifyingGlassIcon', 'MapPinIcon', 'MapIcon', 'MegaphoneIcon', 'MicrophoneIcon', 'MinusCircleIcon', 'MinusSmallIcon', 'MinusIcon', 'MoonIcon', 'MusicalNoteIcon', 'NewspaperIcon', 'NoSymbolIcon', 'NumberedListIcon', 'PaintBrushIcon', 'PaperAirplaneIcon', 'PaperClipIcon', 'PauseCircleIcon', 'PauseIcon', 'PencilSquareIcon', 'PencilIcon', 'PercentBadgeIcon', 'PhoneArrowDownLeftIcon', 'PhoneArrowUpRightIcon', 'PhoneXMarkIcon', 'PhoneIcon', 'PhotoIcon', 'PlayCircleIcon', 'PlayPauseIcon', 'PlayIcon', 'PlusCircleIcon', 'PlusSmallIcon', 'PlusIcon', 'PowerIcon', 'PresentationChartBarIcon', 'PresentationChartLineIcon', 'PrinterIcon', 'PuzzlePieceIcon', 'QrCodeIcon', 'QuestionMarkCircleIcon', 'QueueListIcon', 'RadioIcon', 'ReceiptPercentIcon', 'ReceiptRefundIcon', 'RectangleGroupIcon', 'RectangleStackIcon', 'RocketLaunchIcon', 'RssIcon', 'ScaleIcon', 'ScissorsIcon', 'ServerStackIcon', 'ServerIcon', 'ShareIcon', 'ShieldCheckIcon', 'ShieldExclamationIcon', 'ShoppingBagIcon', 'ShoppingCartIcon', 'SignalSlashIcon', 'SignalIcon', 'SlashIcon', 'SparklesIcon', 'SpeakerWaveIcon', 'SpeakerXMarkIcon', 'Square2StackIcon', 'Square3Stack3DIcon', 'Squares2X2Icon', 'SquaresPlusIcon', 'StarIcon', 'StopCircleIcon', 'StopIcon', 'StrikethroughIcon', 'SunIcon', 'SwatchIcon', 'TableCellsIcon', 'TagIcon', 'TicketIcon', 'TrashIcon', 'TrophyIcon', 'TruckIcon', 'TvIcon', 'UnderlineIcon', 'UserCircleIcon', 'UserGroupIcon', 'UserMinusIcon', 'UserPlusIcon', 'UserIcon', 'UsersIcon', 'VariableIcon', 'VideoCameraSlashIcon', 'VideoCameraIcon', 'ViewColumnsIcon', 'ViewfinderCircleIcon', 'WalletIcon', 'WifiIcon', 'WindowIcon', 'WrenchScrewdriverIcon', 'WrenchIcon', 'XCircleIcon', 'XMarkIcon');
  CREATE TYPE "public"."enum_static_pages_blocks_bento_c_t_a_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_static_pages_blocks_bento_c_t_a_cta_link_appearance" AS ENUM('default', 'outline', 'white');
  CREATE TYPE "public"."enum_static_pages_blocks_bento_c_t_a_cta_link_size" AS ENUM('default');
  CREATE TABLE "pages_blocks_bento_c_t_a_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"icon" "enum_pages_blocks_bento_c_t_a_quotes_icon"
  );
  
  CREATE TABLE "pages_blocks_bento_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_image_id" integer,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_indicators" boolean DEFAULT true,
  	"cta_link_type" "enum_pages_blocks_bento_c_t_a_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_pages_blocks_bento_c_t_a_cta_link_appearance" DEFAULT 'default',
  	"cta_link_size" "enum_pages_blocks_bento_c_t_a_cta_link_size" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bento_c_t_a_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"icon" "enum__pages_v_blocks_bento_c_t_a_quotes_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_bento_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_image_id" integer,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_indicators" boolean DEFAULT true,
  	"cta_link_type" "enum__pages_v_blocks_bento_c_t_a_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__pages_v_blocks_bento_c_t_a_cta_link_appearance" DEFAULT 'default',
  	"cta_link_size" "enum__pages_v_blocks_bento_c_t_a_cta_link_size" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "web_blocks_bento_c_t_a_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"icon" "enum_web_blocks_bento_c_t_a_quotes_icon"
  );
  
  CREATE TABLE "web_blocks_bento_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_image_id" integer,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_indicators" boolean DEFAULT true,
  	"cta_link_type" "enum_web_blocks_bento_c_t_a_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_web_blocks_bento_c_t_a_cta_link_appearance" DEFAULT 'default',
  	"cta_link_size" "enum_web_blocks_bento_c_t_a_cta_link_size" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "_web_v_blocks_bento_c_t_a_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"icon" "enum__web_v_blocks_bento_c_t_a_quotes_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_web_v_blocks_bento_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_image_id" integer,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_indicators" boolean DEFAULT true,
  	"cta_link_type" "enum__web_v_blocks_bento_c_t_a_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__web_v_blocks_bento_c_t_a_cta_link_appearance" DEFAULT 'default',
  	"cta_link_size" "enum__web_v_blocks_bento_c_t_a_cta_link_size" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_blocks_bento_c_t_a_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"icon" "enum_content_blocks_bento_c_t_a_quotes_icon"
  );
  
  CREATE TABLE "content_blocks_bento_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_image_id" integer,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_indicators" boolean DEFAULT true,
  	"cta_link_type" "enum_content_blocks_bento_c_t_a_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_content_blocks_bento_c_t_a_cta_link_appearance" DEFAULT 'default',
  	"cta_link_size" "enum_content_blocks_bento_c_t_a_cta_link_size" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_v_blocks_bento_c_t_a_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"icon" "enum__content_v_blocks_bento_c_t_a_quotes_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_v_blocks_bento_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_image_id" integer,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_indicators" boolean DEFAULT true,
  	"cta_link_type" "enum__content_v_blocks_bento_c_t_a_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__content_v_blocks_bento_c_t_a_cta_link_appearance" DEFAULT 'default',
  	"cta_link_size" "enum__content_v_blocks_bento_c_t_a_cta_link_size" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "static_pages_blocks_bento_c_t_a_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"icon" "enum_static_pages_blocks_bento_c_t_a_quotes_icon"
  );
  
  CREATE TABLE "static_pages_blocks_bento_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"main_image_id" integer NOT NULL,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" numeric DEFAULT 5000,
  	"show_indicators" boolean DEFAULT true,
  	"cta_link_type" "enum_static_pages_blocks_bento_c_t_a_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_static_pages_blocks_bento_c_t_a_cta_link_appearance" DEFAULT 'default',
  	"cta_link_size" "enum_static_pages_blocks_bento_c_t_a_cta_link_size" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk";
  
  DROP INDEX "payload_locked_documents_rels_payload_jobs_id_idx";
  ALTER TABLE "pages_blocks_pricing_card_cards" ADD COLUMN "price_description" varchar;
  ALTER TABLE "_pages_v_blocks_pricing_card_cards" ADD COLUMN "price_description" varchar;
  ALTER TABLE "web_blocks_pricing_card_cards" ADD COLUMN "price_description" varchar;
  ALTER TABLE "_web_v_blocks_pricing_card_cards" ADD COLUMN "price_description" varchar;
  ALTER TABLE "content_blocks_pricing_card_cards" ADD COLUMN "price_description" varchar;
  ALTER TABLE "_content_v_blocks_pricing_card_cards" ADD COLUMN "price_description" varchar;
  ALTER TABLE "static_pages_blocks_pricing_card_cards" ADD COLUMN "price_description" varchar;
  ALTER TABLE "pages_blocks_bento_c_t_a_quotes" ADD CONSTRAINT "pages_blocks_bento_c_t_a_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_bento_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_bento_c_t_a" ADD CONSTRAINT "pages_blocks_bento_c_t_a_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_bento_c_t_a" ADD CONSTRAINT "pages_blocks_bento_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bento_c_t_a_quotes" ADD CONSTRAINT "_pages_v_blocks_bento_c_t_a_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_bento_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bento_c_t_a" ADD CONSTRAINT "_pages_v_blocks_bento_c_t_a_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_bento_c_t_a" ADD CONSTRAINT "_pages_v_blocks_bento_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_bento_c_t_a_quotes" ADD CONSTRAINT "web_blocks_bento_c_t_a_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web_blocks_bento_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "web_blocks_bento_c_t_a" ADD CONSTRAINT "web_blocks_bento_c_t_a_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "web_blocks_bento_c_t_a" ADD CONSTRAINT "web_blocks_bento_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."web"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_bento_c_t_a_quotes" ADD CONSTRAINT "_web_v_blocks_bento_c_t_a_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v_blocks_bento_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_bento_c_t_a" ADD CONSTRAINT "_web_v_blocks_bento_c_t_a_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_web_v_blocks_bento_c_t_a" ADD CONSTRAINT "_web_v_blocks_bento_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_web_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_bento_c_t_a_quotes" ADD CONSTRAINT "content_blocks_bento_c_t_a_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_blocks_bento_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_blocks_bento_c_t_a" ADD CONSTRAINT "content_blocks_bento_c_t_a_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_blocks_bento_c_t_a" ADD CONSTRAINT "content_blocks_bento_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_bento_c_t_a_quotes" ADD CONSTRAINT "_content_v_blocks_bento_c_t_a_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v_blocks_bento_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_bento_c_t_a" ADD CONSTRAINT "_content_v_blocks_bento_c_t_a_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_v_blocks_bento_c_t_a" ADD CONSTRAINT "_content_v_blocks_bento_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_bento_c_t_a_quotes" ADD CONSTRAINT "static_pages_blocks_bento_c_t_a_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages_blocks_bento_c_t_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_bento_c_t_a" ADD CONSTRAINT "static_pages_blocks_bento_c_t_a_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "static_pages_blocks_bento_c_t_a" ADD CONSTRAINT "static_pages_blocks_bento_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."static_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_bento_c_t_a_quotes_order_idx" ON "pages_blocks_bento_c_t_a_quotes" USING btree ("_order");
  CREATE INDEX "pages_blocks_bento_c_t_a_quotes_parent_id_idx" ON "pages_blocks_bento_c_t_a_quotes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bento_c_t_a_order_idx" ON "pages_blocks_bento_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_bento_c_t_a_parent_id_idx" ON "pages_blocks_bento_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_bento_c_t_a_path_idx" ON "pages_blocks_bento_c_t_a" USING btree ("_path");
  CREATE INDEX "pages_blocks_bento_c_t_a_main_image_idx" ON "pages_blocks_bento_c_t_a" USING btree ("main_image_id");
  CREATE INDEX "_pages_v_blocks_bento_c_t_a_quotes_order_idx" ON "_pages_v_blocks_bento_c_t_a_quotes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bento_c_t_a_quotes_parent_id_idx" ON "_pages_v_blocks_bento_c_t_a_quotes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bento_c_t_a_order_idx" ON "_pages_v_blocks_bento_c_t_a" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_bento_c_t_a_parent_id_idx" ON "_pages_v_blocks_bento_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_bento_c_t_a_path_idx" ON "_pages_v_blocks_bento_c_t_a" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_bento_c_t_a_main_image_idx" ON "_pages_v_blocks_bento_c_t_a" USING btree ("main_image_id");
  CREATE INDEX "web_blocks_bento_c_t_a_quotes_order_idx" ON "web_blocks_bento_c_t_a_quotes" USING btree ("_order");
  CREATE INDEX "web_blocks_bento_c_t_a_quotes_parent_id_idx" ON "web_blocks_bento_c_t_a_quotes" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_bento_c_t_a_order_idx" ON "web_blocks_bento_c_t_a" USING btree ("_order");
  CREATE INDEX "web_blocks_bento_c_t_a_parent_id_idx" ON "web_blocks_bento_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "web_blocks_bento_c_t_a_path_idx" ON "web_blocks_bento_c_t_a" USING btree ("_path");
  CREATE INDEX "web_blocks_bento_c_t_a_main_image_idx" ON "web_blocks_bento_c_t_a" USING btree ("main_image_id");
  CREATE INDEX "_web_v_blocks_bento_c_t_a_quotes_order_idx" ON "_web_v_blocks_bento_c_t_a_quotes" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_bento_c_t_a_quotes_parent_id_idx" ON "_web_v_blocks_bento_c_t_a_quotes" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_bento_c_t_a_order_idx" ON "_web_v_blocks_bento_c_t_a" USING btree ("_order");
  CREATE INDEX "_web_v_blocks_bento_c_t_a_parent_id_idx" ON "_web_v_blocks_bento_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_web_v_blocks_bento_c_t_a_path_idx" ON "_web_v_blocks_bento_c_t_a" USING btree ("_path");
  CREATE INDEX "_web_v_blocks_bento_c_t_a_main_image_idx" ON "_web_v_blocks_bento_c_t_a" USING btree ("main_image_id");
  CREATE INDEX "content_blocks_bento_c_t_a_quotes_order_idx" ON "content_blocks_bento_c_t_a_quotes" USING btree ("_order");
  CREATE INDEX "content_blocks_bento_c_t_a_quotes_parent_id_idx" ON "content_blocks_bento_c_t_a_quotes" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_bento_c_t_a_order_idx" ON "content_blocks_bento_c_t_a" USING btree ("_order");
  CREATE INDEX "content_blocks_bento_c_t_a_parent_id_idx" ON "content_blocks_bento_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "content_blocks_bento_c_t_a_path_idx" ON "content_blocks_bento_c_t_a" USING btree ("_path");
  CREATE INDEX "content_blocks_bento_c_t_a_main_image_idx" ON "content_blocks_bento_c_t_a" USING btree ("main_image_id");
  CREATE INDEX "_content_v_blocks_bento_c_t_a_quotes_order_idx" ON "_content_v_blocks_bento_c_t_a_quotes" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_bento_c_t_a_quotes_parent_id_idx" ON "_content_v_blocks_bento_c_t_a_quotes" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_bento_c_t_a_order_idx" ON "_content_v_blocks_bento_c_t_a" USING btree ("_order");
  CREATE INDEX "_content_v_blocks_bento_c_t_a_parent_id_idx" ON "_content_v_blocks_bento_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_content_v_blocks_bento_c_t_a_path_idx" ON "_content_v_blocks_bento_c_t_a" USING btree ("_path");
  CREATE INDEX "_content_v_blocks_bento_c_t_a_main_image_idx" ON "_content_v_blocks_bento_c_t_a" USING btree ("main_image_id");
  CREATE INDEX "static_pages_blocks_bento_c_t_a_quotes_order_idx" ON "static_pages_blocks_bento_c_t_a_quotes" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_bento_c_t_a_quotes_parent_id_idx" ON "static_pages_blocks_bento_c_t_a_quotes" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_bento_c_t_a_order_idx" ON "static_pages_blocks_bento_c_t_a" USING btree ("_order");
  CREATE INDEX "static_pages_blocks_bento_c_t_a_parent_id_idx" ON "static_pages_blocks_bento_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "static_pages_blocks_bento_c_t_a_path_idx" ON "static_pages_blocks_bento_c_t_a" USING btree ("_path");
  CREATE INDEX "static_pages_blocks_bento_c_t_a_main_image_idx" ON "static_pages_blocks_bento_c_t_a" USING btree ("main_image_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_jobs_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_bento_c_t_a_quotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_bento_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_bento_c_t_a_quotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_bento_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "web_blocks_bento_c_t_a_quotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "web_blocks_bento_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_web_v_blocks_bento_c_t_a_quotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_web_v_blocks_bento_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_blocks_bento_c_t_a_quotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_blocks_bento_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_v_blocks_bento_c_t_a_quotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_v_blocks_bento_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "static_pages_blocks_bento_c_t_a_quotes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "static_pages_blocks_bento_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_bento_c_t_a_quotes" CASCADE;
  DROP TABLE "pages_blocks_bento_c_t_a" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_c_t_a_quotes" CASCADE;
  DROP TABLE "_pages_v_blocks_bento_c_t_a" CASCADE;
  DROP TABLE "web_blocks_bento_c_t_a_quotes" CASCADE;
  DROP TABLE "web_blocks_bento_c_t_a" CASCADE;
  DROP TABLE "_web_v_blocks_bento_c_t_a_quotes" CASCADE;
  DROP TABLE "_web_v_blocks_bento_c_t_a" CASCADE;
  DROP TABLE "content_blocks_bento_c_t_a_quotes" CASCADE;
  DROP TABLE "content_blocks_bento_c_t_a" CASCADE;
  DROP TABLE "_content_v_blocks_bento_c_t_a_quotes" CASCADE;
  DROP TABLE "_content_v_blocks_bento_c_t_a" CASCADE;
  DROP TABLE "static_pages_blocks_bento_c_t_a_quotes" CASCADE;
  DROP TABLE "static_pages_blocks_bento_c_t_a" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_jobs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  ALTER TABLE "pages_blocks_pricing_card_cards" DROP COLUMN "price_description";
  ALTER TABLE "_pages_v_blocks_pricing_card_cards" DROP COLUMN "price_description";
  ALTER TABLE "web_blocks_pricing_card_cards" DROP COLUMN "price_description";
  ALTER TABLE "_web_v_blocks_pricing_card_cards" DROP COLUMN "price_description";
  ALTER TABLE "content_blocks_pricing_card_cards" DROP COLUMN "price_description";
  ALTER TABLE "_content_v_blocks_pricing_card_cards" DROP COLUMN "price_description";
  ALTER TABLE "static_pages_blocks_pricing_card_cards" DROP COLUMN "price_description";
  DROP TYPE "public"."enum_pages_blocks_bento_c_t_a_quotes_icon";
  DROP TYPE "public"."enum_pages_blocks_bento_c_t_a_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_bento_c_t_a_cta_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_bento_c_t_a_cta_link_size";
  DROP TYPE "public"."enum__pages_v_blocks_bento_c_t_a_quotes_icon";
  DROP TYPE "public"."enum__pages_v_blocks_bento_c_t_a_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_bento_c_t_a_cta_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_bento_c_t_a_cta_link_size";
  DROP TYPE "public"."enum_web_blocks_bento_c_t_a_quotes_icon";
  DROP TYPE "public"."enum_web_blocks_bento_c_t_a_cta_link_type";
  DROP TYPE "public"."enum_web_blocks_bento_c_t_a_cta_link_appearance";
  DROP TYPE "public"."enum_web_blocks_bento_c_t_a_cta_link_size";
  DROP TYPE "public"."enum__web_v_blocks_bento_c_t_a_quotes_icon";
  DROP TYPE "public"."enum__web_v_blocks_bento_c_t_a_cta_link_type";
  DROP TYPE "public"."enum__web_v_blocks_bento_c_t_a_cta_link_appearance";
  DROP TYPE "public"."enum__web_v_blocks_bento_c_t_a_cta_link_size";
  DROP TYPE "public"."enum_content_blocks_bento_c_t_a_quotes_icon";
  DROP TYPE "public"."enum_content_blocks_bento_c_t_a_cta_link_type";
  DROP TYPE "public"."enum_content_blocks_bento_c_t_a_cta_link_appearance";
  DROP TYPE "public"."enum_content_blocks_bento_c_t_a_cta_link_size";
  DROP TYPE "public"."enum__content_v_blocks_bento_c_t_a_quotes_icon";
  DROP TYPE "public"."enum__content_v_blocks_bento_c_t_a_cta_link_type";
  DROP TYPE "public"."enum__content_v_blocks_bento_c_t_a_cta_link_appearance";
  DROP TYPE "public"."enum__content_v_blocks_bento_c_t_a_cta_link_size";
  DROP TYPE "public"."enum_static_pages_blocks_bento_c_t_a_quotes_icon";
  DROP TYPE "public"."enum_static_pages_blocks_bento_c_t_a_cta_link_type";
  DROP TYPE "public"."enum_static_pages_blocks_bento_c_t_a_cta_link_appearance";
  DROP TYPE "public"."enum_static_pages_blocks_bento_c_t_a_cta_link_size";`)
}
