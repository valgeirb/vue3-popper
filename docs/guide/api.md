# API

## Props

| Name           | Default  | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `placement`    | `bottom` | Preferred placement of the popover               |
| `offsetX`      | `0`      | Distance in pixels along the trigger element     |
| `offsetY`      | `12`     | Distance in pixels away from the trigger element |
| `hover`        | `false`  | Trigger the popover on hover                     |
| `arrow`        | `false`  | Display an arrow on the popover                  |
| `arrowPadding` | `0`      | Stop arrow from reaching the edge of the Popper  |

## Events

| Name          | Description                |
| ------------- | -------------------------- |
| `show:popper` | When the popover is shown  |
| `hide:popper` | When the popover is hidden |

## Slots

| Name      | Description             |
| --------- | ----------------------- |
| `content` | For the popover content |
