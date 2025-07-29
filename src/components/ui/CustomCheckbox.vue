<template>
  <label class="checkbox-label">
    <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkmark"></span>
    <span class="label-text">
      <slot />
    </span>
  </label>
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<style scoped>
.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  user-select: none;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: #191628;
  border: 1px solid #4A4C56;
  border-radius: 4px;
  position: relative;
  box-sizing: border-box;
  transition: border 0.2s, background 0.2s;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 1px;
  width: 5px;
  height: 9px;
  border: solid #000000;
  border-width: 0 2px 2px 0;
  border-radius: 1px;
  transform: rotate(45deg);
  transition: 0.2s;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #8059B9;
  border-color: #8059B9;
}

.label-text {
  color: #fff;
  font-size: 14px;
  font-family: inherit;
}
</style>
