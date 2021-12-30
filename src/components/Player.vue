<template>
  <v-sheet
      class="player pa-2"
      outlined
      elevation="1"
      :color="color"
      rounded
  >
    <div class="text-h6 white--text">Player {{ index + 1 }}</div>
    <div class="score white--text mt-2">
      <div>{{ score }} / 120</div>
      <v-slider
          hide-details
          v-model="score"
          min="0"
          max="120"
          disabled
          color="white"
          class="mb-2"
      />
    </div>
    <v-row
        v-for="points in scoringChoices"
        :key="points"
        dense
    >
      <v-col cols="6">
        <v-btn
            @click="add(points)"
            block
        >
          <v-icon color="green">mdi-plus</v-icon>
          {{ points }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
            @click="subtract(points)"
            block
        >
          <v-icon color="red">mdi-minus</v-icon>
          {{ points }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-btn
            block
            @click="gameStore.undo(index)"
        >
          <v-icon class="mr-2">mdi-refresh</v-icon>
          Undo
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import {getColor} from "@/util/colors";
import {useGameStore} from "@/stores/game-store";

export default {
  name: "Player",
  props: {
    scoringChoices: {
      type: Array,
      default: () => {
        return [1, 2, 3, 5]
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const gameStore = useGameStore();

    return {
      gameStore
    }
  },
  data: () => ({}),
  computed: {
    color() {
      return getColor(this.index);
    },
    score() {
      return this.gameStore.moves.filter(f => f.player === this.index).map(f => f.move).reduce((a, b) => a + b, 0);
    }
  },
  methods: {
    add(points) {
      this.gameStore.recordMove(this.index, parseInt(points))
    },
    subtract(points) {
      this.gameStore.recordMove(this.index, parseInt(points) * -1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>