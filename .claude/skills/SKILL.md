NTV360's Angular frontend coding standards and the @ntv360/component-pantry shared UI library conventions. Use this skill whenever writing, reviewing, or editing Angular/TypeScript code for NTV360 projects — including components, services, templates, SCSS, or constants — to make sure naming, access modifiers, control flow, imports, component structure, and API-call patterns follow team conventions. Also use whenever the user mentions "component pantry", @ntv360/component-pantry, adding or editing a shared UI component, branching/versioning/publishing that library, or writing a commit message / PR for it. Trigger even if the user doesn't explicitly ask for "standards" — e.g. "write a service that fetches dealers" or "add a button component to component pantry" should still follow this skill.NTV360 Frontend Coding Standards
Use this skill for any Angular/TypeScript work in NTV360 projects, and for any work on the shared @ntv360/component-pantry UI library. Apply these rules automatically — don't wait to be asked for "the standards."
For the component library's setup, branching, versioning, and publishing workflow, see references/component-pantry-guide.md — load it when the task touches @ntv360/component-pantry itself (not just consuming it).
1. Naming and access modifiers

camelCase for all class members, variables, and properties. Never PascalCase or snake_case for these.
Access modifiers are meaningful, not decorative:

protected — used only inside the component's HTML template.
private — used only within the TypeScript file itself.
public — accessed from outside the component (e.g. via @ViewChild).


Husky will block commits missing public/private/protected modifiers, so never leave a member unmodified.

2. Type safety

Every function has an explicit return type (void, number, a typed interface like ApiUser, etc.) — never left to inference.
Every method gets JSDoc with @description and @param for each parameter. @returns is optional if the TS return type is already declared. Husky blocks commits with missing method JSDoc.

3. Data and constants

Prefer interface for payload/data shapes. Reserve type for unions and utility types.
Layout constants go in a constants/ folder (e.g. table.constant.ts), exported in ALL_CAPS (e.g. USERS_TABLE_LAYOUT). Never inline large arrays directly in a component.
Interfaces live in files suffixed .interface.ts.

4. Services

Prefix private service members with _.
Expose state to components via a public asReadonly() signal — components can read it but never mutate it directly.

5. Import order
Group imports in this order, top to bottom:

Angular imports (@angular/core, @angular/common)
Third-party and core imports (external libraries, @core/services)
Shared UI components (shared/components)
Local imports (relative paths like ./constants, ../utils)

6. HTML and CSS

Use the new Angular control flow: @for, @if. Never the legacy *ngFor / *ngIf.
SVG icons live as raw markup with a unique ID inside public/icons/icon-sprite.svg, and are referenced in templates via <use href="assets/icons/icon-sprite.svg#icon-name"></use>. Never inline full SVG markup inside a component template.
Keep templates free of long chains of utility classes. Use BEM naming in the template and Tailwind @apply in the SCSS partial:

html<div class="card">
  <h2 class="card__title card__title--active">Hello World</h2>
</div>
scss.card {
  @apply bg-white shadow-md rounded-2xl p-6 border;

  &__title {
    @apply text-lg font-bold text-slate-700;

    &--active {
      @apply text-blue-600;
    }
  }
}
7. Component member order
Order class members consistently, top to bottom:

Injected services
Inputs and outputs
Signals and computed values
Constructor
Lifecycle hooks
Custom methods
API calls, at the bottom, separated by a comment block

8. Architecture and API calls

Keep code DRY: extract repeated logic into shared/utils. Check shared/pipes and shared/directives before writing a new utility from scratch.
Use withLoading(this.isLoading) in RxJS pipes to toggle loading signals automatically. Don't manually call .set(true) / .set(false) for standard loading flows.
Map raw API responses in a dedicated mapDataToUi() method so the .subscribe() callback stays concise.

Reference pattern:
ts/**
 * @description Fetches content using sorting, filtering, and pagination parameters.
 * @param queryParams Query parameters for the content request.
 * @param append Whether to append results for pagination.
 */
private getAllContents(queryParams: QueryParams, append = false): void {
  this.getAllWithSearchSubscription?.unsubscribe();

  if (append) {
    this.isLoadingMoreContents.set(true);
  }

  this.getAllWithSearchSubscription = forkJoin({
    contents: this.mediaLibraryService.getContents(queryParams),
  })
    .pipe(
      withLoading(this.isLoadingContents),
      catchError((error: unknown) => {
        Logger.error('MediaLibrary', 'error fetching contents', error);
        return EMPTY;
      }),
    )
    .subscribe(({ contents }) => {
      this.paginationMeta.set(contents.meta.pagination);
      this.mapDataToUi(null, contents.data, append);
      this.isLoadingMoreContents.set(false);
    });
}
9. Pre-commit checklist (what Husky enforces)
Before treating any code as done, verify:

No console.log() left in code
Every method has JSDoc
Every class member has an explicit public/private/protected modifier
Commit message follows Conventional Commits style, e.g.:

feat: add ntv-uploader drag and drop component
fix: resolve button loading state flicker
chore: bump version to 0.5.1



10. Component Pantry quick facts
@ntv360/component-pantry is NTV360's shared Angular UI library (currently v0.6.3, Angular 22, Tailwind + TypeScript, 24+ components across inputs, layout, data, media, feedback, and navigation). Each component follows a fixed file structure:
textbutton/
├── button.ts            # Logic
├── button.html          # Template
├── button.css           # BEM + Tailwind styles
├── button.types.ts      # Types and interfaces
├── button.constants.ts  # Constants
├── button.manifest.ts   # Strapi/demo configuration
├── button.stories.ts    # Storybook demos
├── button.spec.ts       # Unit tests
└── index.ts             # Barrel export
For local setup, branching/versioning rules, PR flow, and the dev/watch workflow, see references/component-pantry-guide.md.