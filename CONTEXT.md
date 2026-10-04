# jamjam.dev

Jamie's personal portfolio and blog. It presents one person — creative, and a bit of a nerd — not a shop and not a list of services.

## Language

**Post**:
A piece of writing, mainly about tech.
_Avoid_: using a Post for Gallery work, treating a Post as a Project

**Lab**:
A tool Jamie built, shown as an experiment or utility.
_Avoid_: Project, treating a Lab tool as a case study

**Project**:
Web or app work with a full page — the ceremonial, case-study-like record. Projects are the main feature of the site.
_Avoid_: Content project, using Project for photography, videography, graphics, or music

**Gallery**:
The single browse route (`/gallery`) that holds selected non-web work. Context lives in a modal. `/gallery/[slug]` restores that modal for sharing; it is not a case study. Formerly called the Board; `/board` redirects here, and the collection slug stays `board-items` in code and the database.
_Avoid_: Board (old name), Content, Media, treating Gallery items as Projects

**Gallery item**:
One tile in the Gallery (code: `BoardItem`). It has a kind — Photography, Video, Graphics, or Music. One asset vs several is an option on the item (carousel, main image plus the rest in the modal, extra tracks in the modal), not a separate kind.
_Avoid_: Pin, Project, treating single vs set vs EP as different kinds

**Gallery kind**:
The medium of a Gallery item: Photography, Video, Graphics, or Music. Video includes constructed motion (animation, motion graphics).
_Avoid_: Animation as a separate kind, layout variants as kinds (single, carousel, EP)
