import {defineStore} from 'pinia'

export const useGameStore = defineStore('game-store', {
    state: () => ({
        moves: []
    }),
    actions: {
        recordMove(player, move) {
            this.moves.unshift({player: player, move: move})
        },
        undo(player) {
            let index = null;
            for (let i = 0; i < this.moves.length && index === null; i++) {
                if ((this.moves[i].player + '') === (player + ''))
                    index = i;
            }
            console.log(index);
            if (index !== null) {
                this.moves.splice(index, 1);
            }
        }
    }
})