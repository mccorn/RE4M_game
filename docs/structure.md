# Project structure

```sh
- docs
  - structure.md  - project structure
  - game.md - game description
- packages
  - client
    - public
    - src
      - api
      - assets
        - variables.scss
      - components
        { component }
          { component }.tsx
          { component }.module.scss
        - common                          # common UI elements
          - { component }
            - { component }.tsx
            - { component }.module.scss
      - helpers
      - hooks
      - pages
        - { page }
          - { page }.tsx
          - { page }.module.scss
      - router
      - store
      - utils
  - server
    [TODO]
```
