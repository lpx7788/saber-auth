<template>
  <Release :queryId="$route.query.id"></Release>
</template>
<script>

import Release from './release';

export default {
  components: {
    Release,
  },
  data() {
    return {};
  },
}
</script>

