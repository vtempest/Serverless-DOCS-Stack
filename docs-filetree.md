```
src
├── app.d.ts  			#typescript
├── app.html 			#main html
├── app.pcss 			#main styles
├── error.html 			#error 404
├── global.d.ts 		#typescript
├── hooks 			#called each server request
│   ├── authentication.handler.ts #user oauth session
│   ├── authorization.handler.ts #specific routes
│   ├── database.handler.ts 	#connect to drizzle d1
│   └── error.handler.ts 	#error page
├── hooks.server.ts 		#loads hooks
├── lib
│   ├── ROUTES.ts		#autogen by routes-kit
│   ├── components		#ui component blocks
│   │   ├── app			
│   │   │   ├── index.ts
│   │   │   └── sidebar-settings-nav.svelte
│   │   ├── icons		#icons
│   │   │   ├── apple.svelte
│   │   │   ├── cloudflare.svelte
│   │   │   ├── discord.svelte
│   │   │   ├── drizzle.svelte
│   │   │   ├── facebook.svelte
│   │   │   ├── github.svelte
│   │   │   ├── google.svelte
│   │   │   ├── index.ts
│   │   │   ├── instagram.svelte
│   │   │   ├── pnpm.svelte
│   │   │   ├── shacdn.svelte
│   │   │   ├── superforms.svelte
│   │   │   ├── svelte.svelte
│   │   │   ├── tailwind.svelte
│   │   │   ├── tiktok.svelte
│   │   │   ├── twitter.svelte
│   │   │   └── typescript.svelte
│   │   ├── landing-page	#homepage parts
│   │   │   ├── features.svelte
│   │   │   ├── footer.svelte
│   │   │   ├── header.svelte
│   │   │   ├── hero.svelte
│   │   │   └── index.ts
│   │   ├── layout		#navbar parts
│   │   │   ├── index.ts
│   │   │   ├── loader.svelte
│   │   │   ├── logo.svelte
│   │   │   ├── password-strength.svelte
│   │   │   ├── theme-switcher.svelte
│   │   │   ├── transition.svelte
│   │   │   └── user-dropdown-menu.svelte
│   │   └── ui			#basic ui libs
│   │       ├── alert-dialog
│   │       │   ├── alert-dialog-action.svelte
│   │       │   ├── alert-dialog-cancel.svelte
│   │       │   ├── alert-dialog-content.svelte
│   │       │   ├── alert-dialog-description.svelte
│   │       │   ├── alert-dialog-footer.svelte
│   │       │   ├── alert-dialog-header.svelte
│   │       │   ├── alert-dialog-overlay.svelte
│   │       │   ├── alert-dialog-portal.svelte
│   │       │   ├── alert-dialog-title.svelte
│   │       │   └── index.ts
│   │       ├── avatar
│   │       │   ├── avatar-fallback.svelte
│   │       │   ├── avatar-image.svelte
│   │       │   ├── avatar.svelte
│   │       │   └── index.ts
│   │       ├── badge
│   │       │   ├── badge.svelte
│   │       │   └── index.ts
│   │       ├── breadcrumb
│   │       │   ├── breadcrumb-ellipsis.svelte
│   │       │   ├── breadcrumb-item.svelte
│   │       │   ├── breadcrumb-link.svelte
│   │       │   ├── breadcrumb-list.svelte
│   │       │   ├── breadcrumb-page.svelte
│   │       │   ├── breadcrumb-separator.svelte
│   │       │   ├── breadcrumb.svelte
│   │       │   └── index.ts
│   │       ├── button
│   │       │   ├── button.svelte
│   │       │   └── index.ts
│   │       ├── card
│   │       │   ├── card-content.svelte
│   │       │   ├── card-description.svelte
│   │       │   ├── card-footer.svelte
│   │       │   ├── card-header.svelte
│   │       │   ├── card-title.svelte
│   │       │   ├── card.svelte
│   │       │   └── index.ts
│   │       ├── checkbox
│   │       │   ├── checkbox.svelte
│   │       │   └── index.ts
│   │       ├── dialog
│   │       │   ├── dialog-content.svelte
│   │       │   ├── dialog-description.svelte
│   │       │   ├── dialog-footer.svelte
│   │       │   ├── dialog-header.svelte
│   │       │   ├── dialog-overlay.svelte
│   │       │   ├── dialog-portal.svelte
│   │       │   ├── dialog-title.svelte
│   │       │   └── index.ts
│   │       ├── dropdown-menu
│   │       │   ├── dropdown-menu-checkbox-item.svelte
│   │       │   ├── dropdown-menu-content.svelte
│   │       │   ├── dropdown-menu-item.svelte
│   │       │   ├── dropdown-menu-label.svelte
│   │       │   ├── dropdown-menu-radio-group.svelte
│   │       │   ├── dropdown-menu-radio-item.svelte
│   │       │   ├── dropdown-menu-separator.svelte
│   │       │   ├── dropdown-menu-shortcut.svelte
│   │       │   ├── dropdown-menu-sub-content.svelte
│   │       │   ├── dropdown-menu-sub-trigger.svelte
│   │       │   └── index.ts
│   │       ├── form
│   │       │   ├── form-button.svelte
│   │       │   ├── form-description.svelte
│   │       │   ├── form-element-field.svelte
│   │       │   ├── form-field-errors.svelte
│   │       │   ├── form-field.svelte
│   │       │   ├── form-fieldset.svelte
│   │       │   ├── form-label.svelte
│   │       │   ├── form-legend.svelte
│   │       │   └── index.ts
│   │       ├── input
│   │       │   ├── index.ts
│   │       │   └── input.svelte
│   │       ├── label
│   │       │   ├── index.ts
│   │       │   └── label.svelte
│   │       ├── pagination
│   │       │   ├── index.ts
│   │       │   ├── pagination-content.svelte
│   │       │   ├── pagination-ellipsis.svelte
│   │       │   ├── pagination-item.svelte
│   │       │   ├── pagination-link.svelte
│   │       │   ├── pagination-next-button.svelte
│   │       │   ├── pagination-prev-button.svelte
│   │       │   └── pagination.svelte
│   │       ├── popover
│   │       │   ├── index.ts
│   │       │   └── popover-content.svelte
│   │       ├── progress
│   │       │   ├── index.ts
│   │       │   └── progress.svelte
│   │       ├── separator
│   │       │   ├── index.ts
│   │       │   └── separator.svelte
│   │       ├── sheet
│   │       │   ├── index.ts
│   │       │   ├── sheet-content.svelte
│   │       │   ├── sheet-description.svelte
│   │       │   ├── sheet-footer.svelte
│   │       │   ├── sheet-header.svelte
│   │       │   ├── sheet-overlay.svelte
│   │       │   ├── sheet-portal.svelte
│   │       │   └── sheet-title.svelte
│   │       ├── sonner
│   │       │   ├── index.ts
│   │       │   └── sonner.svelte
│   │       ├── switch
│   │       │   ├── index.ts
│   │       │   └── switch.svelte
│   │       ├── table
│   │       │   ├── index.ts
│   │       │   ├── table-body.svelte
│   │       │   ├── table-caption.svelte
│   │       │   ├── table-cell.svelte
│   │       │   ├── table-footer.svelte
│   │       │   ├── table-head.svelte
│   │       │   ├── table-header.svelte
│   │       │   ├── table-row.svelte
│   │       │   └── table.svelte
│   │       ├── tabs
│   │       │   ├── index.ts
│   │       │   ├── tabs-content.svelte
│   │       │   ├── tabs-list.svelte
│   │       │   └── tabs-trigger.svelte
│   │       └── tooltip
│   │           ├── index.ts
│   │           └── tooltip-content.svelte
│   ├── configs				#configure app defaults
│   │   ├── auth-methods.ts		#allowed methods
│   │   ├── cookies-names.ts
│   │   ├── fields-length.ts
│   │   ├── general.ts
│   │   ├── landing			#homepage parts
│   │   │   ├── footer-links.ts
│   │   │   └── header-links.ts
│   │   ├── links
│   │   │   ├── index.ts
│   │   │   ├── socials.ts
│   │   │   └── tools.ts
│   │   └── rate-limiters		#rate limiting
│   │       ├── app
│   │       │   ├── index.ts
│   │       │   └── settings.limiter.ts
│   │       └── auth
│   │           ├── change-email.limiter.ts
│   │           ├── index.ts
│   │           ├── login.limiter.ts
│   │           ├── register.limiter.ts
│   │           ├── resend-email.limiter.ts
│   │           ├── reset-password.limiter.ts
│   │           └── verify-email.limiter.ts
│   ├── logger				#logger
│   │   └── index.ts
│   ├── server
│   │   ├── auth			#server auth
│   │   │   ├── auth-utils.ts
│   │   │   └── index.ts
│   │   ├── db				#db  config
│   │   │   ├── index.ts
│   │   │   ├── oauth-accounts		#google oauth
│   │   │   │   ├── index.ts
│   │   │   │   ├── model.ts
│   │   │   │   ├── schema.ts
│   │   │   │   └── types.ts
│   │   │   ├── schema.ts
│   │   │   ├── sessions		#usersessions
│   │   │   │   ├── index.ts
│   │   │   │   ├── schema.ts
│   │   │   │   └── types.ts
│   │   │   ├── tokens
│   │   │   │   ├── index.ts
│   │   │   │   ├── model.ts
│   │   │   │   ├── schema.ts
│   │   │   │   └── types.ts
│   │   │   ├── types.ts
│   │   │   └── users			#users
│   │   │       ├── index.ts
│   │   │       ├── model.ts
│   │   │       ├── schema.ts
│   │   │       └── types.ts
│   │   ├── email			#emailer
│   │   │   ├── index.ts
│   │   │   ├── send.ts
│   │   │   ├── templates		#templates
│   │   │   │   ├── email-change.html
│   │   │   │   ├── email-verification.html
│   │   │   │   ├── password-reset.html
│   │   │   │   └── welcome.html
│   │   │   └── types.ts
│   │   └── security			#security init
│   │       ├── guards.ts
│   │       ├── index.ts
│   │       └── rate-limiter.ts
│   ├── stores				#ui utils
│   │   ├── navigation-delayed.store.ts
│   │   └── reduced-motion.store.ts
│   ├── utils
│   │   └── style-transitions.ts
│   └── validations			#input validation rules
│       ├── admin	
│       │   └── database
│       │       └── users.schema.ts
│       ├── app
│       │   ├── settings
│       │   │   ├── account.schema.ts
│       │   │   ├── index.ts
│       │   │   ├── notifications.schema.ts
│       │   │   └── profile.schema.ts
│       │   └── update-user.schema.ts
│       ├── auth
│       │   ├── change-email-form.schema.ts
│       │   ├── index.ts
│       │   ├── login-form.schema.ts
│       │   ├── register-form.schema.ts
│       │   ├── reset-password-form.schema.ts
│       │   └── verify-email-form.schema.ts
│       ├── core
│       │   ├── email.field.ts
│       │   ├── index.ts
│       │   ├── is-admin.field.ts
│       │   ├── is-verified.field.ts
│       │   ├── name.field.ts
│       │   ├── password-confirm.field.ts
│       │   ├── password.field.ts
│       │   ├── token.field.ts
│       │   ├── user-id.field.ts
│       │   └── username.field.ts
│       └── params
│           ├── index.ts
│           ├── token.schema.ts
│           └── user-id.schema.ts
├── params					#needed for url id routes
│   └── userId.ts
├── reset.d.ts					#reset css styles
├── routes					#ROUTES	
│   ├── (admin)					#admin panel
│   │   ├── +layout.server.ts
│   │   ├── +layout.svelte
│   │   └── admin
│   │       ├── +page.svelte
│   │       ├── customers
│   │       │   ├── +page.server.ts
│   │       │   ├── +page.svelte
│   │       │   └── [userId=userId]
│   │       │       ├── +page.server.ts
│   │       │       └── +page.svelte
│   │       ├── orders
│   │       │   ├── +page.server.ts
│   │       │   └── +page.svelte
│   │       ├── products
│   │       │   ├── +page.server.ts
│   │       │   └── +page.svelte
│   │       └── settings
│   │           ├── +page.server.ts
│   │           └── +page.svelte
│   ├── (app)					#main app routes
│   │   ├── +layout.server.ts
│   │   ├── +layout.svelte
│   │   └── app
│   │       ├── billing
│   │       │   ├── +page.server.ts
│   │       │   └── +page.svelte
│   │       ├── dashboard
│   │       │   ├── +page.server.ts
│   │       │   └── +page.svelte
│   │       ├── profile
│   │       │   ├── +page.server.ts
│   │       │   └── +page.svelte
│   │       └── settings			#settings routes
│   │           ├── +layout.svelte
│   │           ├── +page.server.ts
│   │           ├── +page.svelte
│   │           ├── account
│   │           │   ├── +page.server.ts
│   │           │   └── +page.svelte
│   │           ├── notifications
│   │           │   ├── +page.server.ts
│   │           │   └── +page.svelte
│   │           └── profile
│   │               ├── +page.server.ts
│   │               └── +page.svelte
│   ├── (auth)					#auth routes handler
│   │   ├── +layout.svelte
│   │   └── auth
│   │       ├── change-email			#email based auth
│   │       │   ├── confirm
│   │       │   │   ├── +page.server.ts
│   │       │   │   └── +page.svelte
│   │       │   └── submit
│   │       │       ├── +page.server.ts
│   │       │       └── +page.svelte
│   │       ├── login
│   │       │   ├── +page.server.ts
│   │       │   └── +page.svelte
│   │       ├── logout
│   │       │   └── +page.server.ts
│   │       ├── oauth				#google login
│   │       │   ├── github
│   │       │   │   ├── +server.ts
│   │       │   │   └── callback
│   │       │   │       └── +server.ts
│   │       │   └── google
│   │       │       ├── +server.ts
│   │       │       └── callback
│   │       │           └── +server.ts
│   │       ├── register			#auth utils
│   │       │   ├── +page.server.ts
│   │       │   └── +page.svelte
│   │       ├── reset-password
│   │       │   ├── +page.server.ts
│   │       │   ├── +page.svelte
│   │       │   └── [userId=userId]
│   │       │       ├── +page.server.ts
│   │       │       ├── +page.svelte
│   │       │       └── new-password
│   │       │           ├── +page.server.ts
│   │       │           └── +page.svelte
│   │       └── verify-email
│   │           ├── +page.server.ts
│   │           └── +page.svelte		
│   ├── (landing)				#landing page
│   │   ├── +layout.server.ts		
│   │   ├── +layout.svelte
│   │   ├── +page.server.ts
│   │   ├── +page.svelte		
│   │   └── legal				#legal footer
│   │       ├── cookie-policy
│   │       │   └── +page.svelte
│   │       ├── privacy-policy
│   │       │   └── +page.svelte
│   │       └── terms-and-conditions
│   │           └── +page.svelte
│   ├── +error.svelte				#error
│   ├── +layout.server.ts			#main layout for all
│   └── +layout.svelte
└── worker-configuration.d.ts

```