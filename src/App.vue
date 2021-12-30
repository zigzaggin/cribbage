<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
        dense
        hide-on-scroll
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Cribbage</v-toolbar-title>
      <v-spacer/>
      <v-btn
          color="green"
          @click="reset"
      >
        New Game
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
      <v-list
          dense
          nav
      >
        <v-list-item>
          <v-text-field
              v-model="numberOfPlayers"
              label="Number of Score Cards"
          />
        </v-list-item>
        <v-list-item>
          <v-text-field
              v-model="scoringChoices"
              label="Scoring Choices"
          />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <v-row dense>
          <v-col
              v-for="(p, i) in players"
              :key="p.id"
              cols="6"
          >
            <Player
                :key="(p.id + instance) + ''"
                :scoring-choices="scoringChoices.split(',').map(f => f.trim())"
                :index="i"
            />
          </v-col>
        </v-row>
        <v-card
            v-if="gameStore.moves.length > 0"
            elevation="1"
            class="mt-3"
        >
          <v-list
              dense
          >
            <v-list-item
                v-for="(move, i) in gameStore.moves"
                :key="i"
            >
              <v-row>
                <v-col :class="getColor(move.player)+ '--text'">
                  Player {{ move.player + 1 }}
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="text-right">
                  <v-icon v-if="move.move > 0" color="green">mdi-plus</v-icon>
                  <v-icon v-if="move.move < 0" color="red">mdi-minus</v-icon>
                  {{ Math.abs(move.move) }}
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>
      </v-container>
      <v-dialog
          v-model="winner"
          transition="dialog-bottom-transition"
          max-width="500"
          persistent
      >
        <v-card>
          <v-toolbar
              :color="getColor(winner)"
              dark
          >
            Player {{ parseInt(winner) + 1 }} Wins!
          </v-toolbar>

          <v-card-text class="pt-7">
            <div>Final Scores:</div>
            <div
                v-for="(score, key) in scores"
                :key="key"
            >
              <span
                  :class="getColor(key) + '--text'"
              >
                Player {{ parseInt(key) + 1 }}:
              </span>
              {{ score }}
              <template v-if="score <= 60">Super Skunked :(</template>
              <template v-else-if="score <= 90">Skunked</template>
            </div>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
                color="primary"
                text
                @click="reset"
            >
              New Game
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import {useGameStore} from "@/stores/game-store";
import Player from "@/components/Player";
import {getColor} from "@/util/colors";

export default {
  name: 'App',

  components: {
    Player,
  },
  setup() {
    const gameStore = useGameStore();

    return {
      gameStore,
      getColor
    }
  },
  data: () => ({
    instance: 0,
    numberOfPlayers: 2,
    scoringChoices: "1, 2, 3, 5",
    drawer: false
  }),
  computed: {
    players() {
      const rtv = [];

      for (let i = 0; i < this.numberOfPlayers; i++) {
        rtv.push({
          id: i
        })
      }

      return rtv;
    },
    scores() {
      const scores = {};
      this.gameStore.moves.forEach(move => {
        scores[move.player] = (scores[move.player] || 0) + move.move;
      });
      return scores;
    },
    winner() {
      let winner = null;
      Object.keys(this.scores).forEach(key => {
        if (this.scores[key] >= 120)
          winner = parseInt(key);
      });

      if (winner !== null)
        return winner + "";

      return false;
    }
  },
  methods: {
    reset() {
      this.instance++;
      this.gameStore.$reset();
    }
  }
};
</script>
