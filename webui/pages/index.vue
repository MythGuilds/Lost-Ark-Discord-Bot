<template>
  <div class="section ">
    <div class="columns">
      <div class="column title mb-6">Abyss Dungeons Party Creator</div>
    </div>
    <div class="columns">
      <div class="column">
        <b-field label="Select your availability (max 6)">
          <b-datepicker
            placeholder="Click to select..."
            v-model="dates"
            :min-date="yesterday"
            multiple>
          </b-datepicker>
        </b-field>
      </div>
      <div class="column">
        <b-field label="Dungeon Name">
          <div class="select">
            <select>
              <option>Select dungeon</option>
              <option>Demon Beast Canyon</option>
              <option>Necromancer’s Origin</option>
              <option>Citadel of Illusions</option>
              <option>Aurelsud Palace</option>
              <option>Oblivion Sea</option>
              <option>Perilous Abyss</option>
              <option>Underwater Sanctuary</option>
              <option>Eye of Aira</option>
              <option>Oreha Prabasa</option>
            </select>
          </div>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-button type="is-primary mt-2">Generate</b-button>
      </div>
    </div>
  </div>

</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'IndexPage',
  components: {
    Card
  },
  data() {
    return {
      dates: [],
      yesterday: new Date(new Date().setDate(new Date().getDate()-1))
    }
  },
  watch: {
    dates: function (val) {
      if (val.length > 6)
      {
        val.pop()
      }
    }
  }
}
</script>
<style scoped>

</style>
