<template>
  <div class="section ">
    <div class="columns">
      <div class="column title mb-6">Abyss Dungeons Party Creator</div>
    </div>
    <form>
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
              <select v-model="dungeon" required>
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
          <b-button type="is-primary mt-2" @click="checkFields">Generate</b-button>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
const { DateTime } = require("luxon");
function sortLuxonDates(a, b) {
  return a.toMillis() - b.toMillis()
}
import Card from '~/components/Card'

export default {
  name: 'IndexPage',
  components: {
    Card
  },
  data() {
    return {
      dates: [new Date(new Date().setDate(new Date().getDate()))],
      dungeon: "",
      yesterday: new Date(new Date().setDate(new Date().getDate()-1)),
      freshGen: true
    }
  },
  watch: {
    dates: function (val) {
      if (val.length > 6)
      {
        val.pop()
      }
    }
  },
  computed: {
    formattedDates() {
      const dates = this.$data.dates
      let luxonDates = []
      let newDates = []
      dates.forEach(function (date) {
        luxonDates.push(DateTime.fromISO(date.toISOString()))
      })
      luxonDates.sort(sortLuxonDates)
      luxonDates.forEach(function (date) {
        newDates.push(date.toLocaleString(DateTime.DATE_SHORT))
      })
      return newDates
    }
  },
  methods: {
    checkFields() {
      document.forms[0].reportValidity();
      if (!document.querySelectorAll('input')[0].value) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Availability blank, reseting to default...`,
          position: 'is-top',
          type: 'is-black'
        })
        this.$data.freshGen = true
        this.$data.dates = [new Date(new Date().setDate(new Date().getDate()))]
      }

    }
  },
  mounted() {
    let self = this
    document.querySelectorAll('input')[0].onclick = function () {
      if (self.$data.freshGen) {
        self.$data.freshGen = false
        self.$data.dates = []
      }
    }
  }
}
</script>
<style scoped>

</style>
