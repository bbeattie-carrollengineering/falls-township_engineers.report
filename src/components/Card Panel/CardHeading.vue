<script setup>
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-popover";

const props = defineProps({
  districtName: String,
  districtSchoolCount: Number,
  districtStudentCount: Number,
  districtTeacherCount: Number,
  districtStudentTeacherRatio: String,
})

const createPopoverContent = () => {
  return `<p class="popover-content"><span>${props.districtName}</span> has a total of <span>${props.districtSchoolCount}</span> schools, with a student body of <span>${props.districtStudentCount.toLocaleString('en-US')}</span> students, <span>${props.districtTeacherCount.toFixed(0)}</span> teachers, and a ratio of <span>${props.districtStudentTeacherRatio}</span> students to teachers.</p>`
}

const createPopover = (calciteAction) => {
  const calcitePopover = document.createElement("calcite-popover")
  calciteAction.insertAdjacentElement('afterend',calcitePopover)
  calcitePopover.referenceElement = calciteAction
  calcitePopover.heading = "District Information:"
  calcitePopover.closable = true
  calcitePopover.autoClose = true
  calcitePopover.innerHTML = createPopoverContent()
  return calcitePopover
}

const togglePopover = (e) => {
  const calciteAction = e.target
  const calciteActionNextSibling = calciteAction.nextSibling

  if (calciteActionNextSibling === null || calciteActionNextSibling.tagName !== 'CALCITE-POPOVER') {
  const calcitePopover = createPopover(calciteAction)
  calcitePopover.open = true
  }
}



</script>

<template>
  <div slot="heading">
    <span>{{ props.districtName}}</span>
    <calcite-action
        @click="togglePopover"
        appearance="transparent"
        icon="information"
        scale="s"
    ></calcite-action>
  </div>
</template>

<style scoped>


div[slot="heading"] {
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--calcite-color-foreground-2);
  border-radius: var(--calcite-border-radius);
  padding: 2px 5px;
  margin-bottom: 10px;
}

span {
  margin-left: 2px;
}
</style>

<style>

.popover-content {
  padding: 10px;
  font-size: 0.875rem;
  line-height: 1.375rem;
}

.popover-content span {
  font-weight: bold;
  color: var(--calcite-color-brand);
}

</style>