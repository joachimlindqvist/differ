# Differ (prototype)

Differ returns the difference in words between two strings.

#### Usage

```
var Differ = require('Differ');

var differ = new Differ("this is the first sentence", "this is the second sentence");
var diff = differ.diff();
```

#### Formatting

The returned `diff` may be formatted with `diff.format(<valid-format>)`
