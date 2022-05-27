var score = 0;

function start(x, y) { "use strict"; //strict 모드 : 엄격하게 오류를 보여주는 모드? 

    const Tile_set = 68; //const : 변경 불가능함, 재선언시 알려줌
    //let : 변경 가능, 재선언시 알려줌 / var : 변경 가능, 재선언시 안 알려주고 바뀜
    
    var time, limitColumn, controller, display, game;

    time = x;

    limitColumn = y;

    controller = {

        down:false, left:false, right:false, up:false, type:"left",

        keyUpDown: function(event) {

            var key_state = (event.type == "keydown")?true:false;

            switch(event.keyCode) {
                
                case 37: controller.left = key_state; break; //왼쪽 버튼 
                case 38: controller.up = key_state; break; //위쪽 버튼 
                case 39: controller.right = key_state; break; //오른쪽 버튼 
                
            }
        
        }

    };

    display = {
    
        butting: document.createElement("canvas").getContext("2d"),
        context: document.getElementById("can").getContext("2d"),
        tile_sheet: document.getElementById("wall"),
        char_sheet: document.getElementById("chr"),
        back_sheet: document.getElementById("back"),
        interval: 0 ,

        render: function(game) {

            this.butting.clearRect(0, 0, this.butting.canvas.width, this.butting.canvas.height);
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

            var a = game.area.map.slice(limitColumn);

            this.butting.drawImage(this.back_sheet, 0, (limitColumn / 8) * (Tile_set - 4), (Tile_set - 4) * 8, (Tile_set - 4) * 8, 0, 0, Tile_set * 8, Tile_set * 8);

            for (let i = 63 ; i > -1; i--) {

                this.butting.drawImage(this.tile_sheet, a[i] * (Tile_set - 4), 0, Tile_set - 4, Tile_set - 4, (i % game.area.columns) * Tile_set, Math.floor(i / game.area.columns) * Tile_set, Tile_set, Tile_set);

            }

            if (game.player.jumping == true) {

                if (game.player.x_velocity < 0) {

                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 4, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);        

                } else {

                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 9, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);

                }
        
            
            } else if (parseInt(game.player.x) < parseInt(game.player.x_old)) {

                this.interval += 1;

                if (this.interval < 15) {

                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 1, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);

                } else if (this.interval < 25) {

                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 2, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);

                } else if (this.interval < 40) {

                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 3, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);

                } else {

                    if (this.interval > 50) {

                        this.interval = 0;

                    }
                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 2, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);

                }


            } else if (parseInt(game.player.x) > parseInt(game.player.x_old)) {
         
                this.interval += 1;

                if (this.interval < 15) {

                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 5, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);

                } else if (this.interval < 25) {

                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 6, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);

                } else if (this.interval < 40) {

                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 7, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);

                } else {

                    if (this.interval > 50) {

                        this.interval = 0;

                    }
                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 6, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);

                }

            } else {
            
                if (controller.type == "right") {

                    this.butting.drawImage(this.char_sheet, (Tile_set - 4) * 5, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);   

                } else {

                    this.butting.drawImage(this.char_sheet, 0, 0, Tile_set - 4, Tile_set - 4, game.player.x, game.player.y, game.player.width, game.player.height);

                }
            
            }

            if (game.mob.stone.spon == true) {

                this.butting.drawImage(this.tile_sheet, 13 * (Tile_set - 4), 0, Tile_set - 4, Tile_set - 4, game.mob.stone.x, game.mob.stone.y, game.mob.stone.width, game.mob.stone.height);

            }

            if (game.mob.bird.spon == true) {

                this.butting.drawImage(this.tile_sheet, 16 * (Tile_set - 4), 0, Tile_set - 4, Tile_set - 4, game.mob.bird.x, game.mob.bird.y, game.mob.bird.width, game.mob.bird.height);

            }

            if (game.mob.bird2.spon == true) {

                this.butting.drawImage(this.tile_sheet, 17 * (Tile_set - 4), 0, Tile_set - 4, Tile_set - 4, game.mob.bird2.x, game.mob.bird2.y, game.mob.bird2.width, game.mob.bird2.height);

            }

            this.context.drawImage(this.butting.canvas, 0, 0, this.butting.canvas.width, this.butting.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);

        },

        resize: function(event) {

            let height = document.documentElement.clientHeight;

            display.context.canvas.width = Tile_set * 8;

            if (display.context.canvas.width >= height * 0.5) {

                display.context.canvas.width = height * 0.5;

            }

            display.context.canvas.height = display.context.canvas.width;

            display.render(game);

        }

    };

    game = {

        area: {

            columns: 8,
            map: [0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0,
                 15, 0, 0, 0, 0, 0, 0, 0,
                  9, 0, 0, 8, 0, 0, 8, 0,
                 11, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 8,
                  0, 8, 0, 0, 8, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 8, 0,
                  6, 6, 9, 0, 0, 0, 0, 0,
                  1, 7,11, 2, 0, 0, 0, 0,
                  4, 0, 0, 0, 0, 0, 0, 0,
                 11, 0, 0, 0, 2, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 2, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0,
                  9, 0, 0, 0,10, 3, 0, 0,
                  4, 0, 0, 0,12, 1, 6, 6,
                  4, 8, 0, 0, 0, 5, 1, 1,
                  4, 0, 0, 0, 0, 5, 1, 1,
                  4, 0, 0, 0, 0, 5, 1, 1,
                  1, 6, 6, 6, 6, 1, 1, 1]

        },

        player: {

            jumping:    true,
            height:     Tile_set - 0.2,
            width:      Tile_set - 0.2,
            x:          Tile_set * 4 - Tile_set * 0.5 + 2,
            x_old:      Tile_set * 4 - Tile_set * 0.5 + 2,
            x_velocity: 0,
            y:          Tile_set * 6,
            y_old:      Tile_set * 7,
            y_velocity: 0,

        },

        mob: {
            stone: {
            
                jumping: false,
                spon: false,
                width: Tile_set - 0.2,
                height: Tile_set - 0.2,
                x: Tile_set * 3,
                x_old: Tile_set * 3,
                y: 0,
                y_old: 0,
                x_velocity: 2,
                y_velocity: 0,

            },

            bird: {

                spon: false,
                width: Tile_set - 0.2,
                height: Tile_set - 0.5,
                x: 0,
                y: Tile_set * 2,
                x_velocity: 3,
                y_velocity: 0,

            },

            bird2: {

                spon: false,
                width: Tile_set - 0.2,
                height: Tile_set - 0.5,
                x: Tile_set * 8,
                y: Tile_set * 2,
                x_velocity: -3,
                y_velocity: 0,

            }

        },

        collider: {
            // 0 : 공백 1 : 바위로 꽉 찬 블럭 / 2 : 통과 되는 반블럭 / 3 : 통과 안 되는 반블럭 / 4 : 바위 오른 면 / 5 : 바위 왼 면 / 6 : 바위 윗면 / 7 : 바위 아랫면
            // 9 : 오른위 블럭 / 10 : 왼위 블럭 / 11 : 오른아래 블럭 / 12 : 왼아래 블럭

            offset: 0.001,

            1: function(object, column, row) {

                if (this.collideTop(object, row)) return;
                if (this.collideLeft(object, column)) return;
                if (this.collideRight(object, column)) return;
                this.collideBottom(object, row);

            },

            2: function(object, column, row) {

                this.collideTop(object, row, Tile_set * 0.5);

            },

            3: function(object, column, row) {

                if (this.collideTop(object, row, Tile_set * 0.5)) return;

                if (object.y + object.height > row * Tile_set + Tile_set * 0.5) {

                    if (this.collideLeft(object, column)) return;
                    if (this.collideRight(object, column)) return;

                }

                this.collideBottom(object, row);

            },

            4: function(object, column, row) {

                if (this.collideTop(object, row)) return;
                if (this.collideLeft(object, column)) return;
                if (this.collideRight(object, column)) return;
                this.collideBottom(object, row);

            },

            5: function(object, column, row) {

                if (this.collideTop(object, row)) return;
                if (this.collideLeft(object, column)) return;
                if (this.collideRight(object, column)) return;
                this.collideBottom(object, row);

            },

            6: function(object, column, row) {

                if (this.collideTop(object, row)) return;
                if (this.collideLeft(object, column)) return;
                if (this.collideRight(object, column)) return;
                this.collideBottom(object, row);

            },

            7: function(object, column, row) {

                if (this.collideTop(object, row)) return;
                if (this.collideLeft(object, column)) return;
                if (this.collideRight(object, column)) return;
                this.collideBottom(object, row);

            },

            8: function(object, column, row) {
                
                var limitColumn_old = limitColumn;

                this.collideTop(object, row, Tile_set * 0.5);

                if (game.player.jumping == false) {

                    window.setTimeout(() => {

                        game.area.map[row * game.area.columns + column + limitColumn_old] = 0;
    
                    }, 1500);
                    window.setTimeout(() => {
    
                        game.area.map[row * game.area.columns + column + limitColumn_old] = 8;
    
                    }, 3000);

                }

            },

            9: function(object, column, row) {

                if (this.collideTop(object, row)) return;
                if (this.collideLeft(object, column)) return;
                if (this.collideRight(object, column)) return;
                this.collideBottom(object, row);

            },

            10: function(object, column, row) {

                if (this.collideTop(object, row)) return;
                if (this.collideLeft(object, column)) return;
                if (this.collideRight(object, column)) return;
                this.collideBottom(object, row);

            },

            11: function(object, column, row) {

                if (this.collideTop(object, row)) return;
                if (this.collideLeft(object, column)) return;
                if (this.collideRight(object, column)) return;
                this.collideBottom(object, row);

            },

            12: function(object, column, row) {

                if (this.collideTop(object, row)) return;
                if (this.collideLeft(object, column)) return;
                if (this.collideRight(object, column)) return;
                this.collideBottom(object, row);

            },

            13: function(object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2) {

                if (this.collideTop2(object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2)) return;
                if (this.collideLeft2(object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2)) return;
                if (this.collideRight2(object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2)) return;
                this.collideBottom2(object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2);

            },

            14: function(object, column, row) {

                score = time * 9;

                newPage('result2.html', score);

            },

            15: function(object, column, row) {

                var limitColumn_old = limitColumn;

                window.setTimeout(() => {

                    game.area.map[row * game.area.columns + column + limitColumn_old] = 14;

                }, 200);

            },

            collideBottom: function(object, row, y_offset = Tile_set) {

                let bottom = row * Tile_set + y_offset;

                if (object.y < bottom && object.y_old >= bottom) {

                    object.y_velocity = 0;
                    object.y = bottom + this.offset;

                    return true;

                } return false;

            },

            collideBottom2: function(object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2, y_offset = 0) {

                let bottom = (object2.y + object2.height) + y_offset;

                // console.log(bottom, object.y );

                if (obj_column * Tile_set >= object2.x && obj_column * Tile_set <= object2.x + object2.width) {

                    if (object.y < bottom && object.y_old >= bottom) {
        
                        object.x_velocity += 5;
                        object.y_velocity += 5;
                        object.y = bottom + this.offset;
              
                        return true;
              
                      } return false;

                } return false;

            },

            collideLeft: function(object, column) {

                let left = column * Tile_set;

                if (object.x + object.width > left && object.x_old + object.width <= left) {
        
                  object.x_velocity = 0;
                  object.x = left - object.width - this.offset;
        
                  return true;
        
                } return false;

            },

            collideLeft2: function(object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2, y_offset = 0) {

                let left = object2.x + object2.width;

                if (obj_row * Tile_set >= object2.y && obj_row * Tile_set <= object2.y + object2.height) {

                    if (object.x + object.width > left && object.x_old + object.width <= left) {
        
                        object.x_velocity += 10;
                        object.y_velocity = 0;
                        object.x = left - object.width - this.offset;
              
                        return true;
              
                      } return false;

                } return false;

            },

            collideRight: function(object, column) {

                let right = column *Tile_set +Tile_set;

                if (object.x < right && object.x_old >= right) {
        
                  object.x_velocity = 0;
                  object.x = right;
        
                  return true;
        
                } return false;

            },

            collideRight2: function(object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2, y_offset = 0) {

                let right = object2.x + object2.width;

                if (obj_row * Tile_set >= object2.y && obj_row * Tile_set <= object2.y + object2.height) {

                    if (object.x < right && object.x_old >= right) {
        
                        object.x_velocity -= 5;
                        object.y_velocity = 0;
                        object.x = right;
              
                        return true;
              
                      } return false;

                } return false;

            },

            collideTop: function(object, row, y_offset = 0) {

                let top = row * Tile_set + y_offset;

                if (object.y + object.height > top && object.y_old + object.height <= top) {
        
                  object.jumping = false;
                  object.y_velocity = 0;
                  object.y = top - object.height - this.offset ;
        
                  return true;
        
                } return false;

            },

            collideTop2: function(object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2, y_offset = 0) {

                let top = object2.y + object2.height + y_offset;

                if (obj_column * Tile_set >= object2.x && obj_column * Tile_set <= object2.x + object2.width) {

                    if (object.y + object.height > top && object.y_old + object.height <= top) {
        
                        object.x_velocity += 5;
                        object.y_velocity += 5;
                        object.y = top - object.height - this.offset ;
              
                        return true;
              
                      } return false;

                } return false;

            },

            collideDis: function(object, row, column, y_offset = 0) {

                if (object.y + object.height > top && object.y_old + object.height <= top) {

                    object.jumping = false;
                    object.y_velocity = 0;
                    object.y = top - object.height - this.offset;
          
                    return true;
          
                  } return false;

            },

            handleCollision: function(object, area) {

                var column, row, value;

                /* TEST TOP */

                column = Math.floor(object.x / Tile_set);// The column under the left side of the object:
                row    = Math.floor(object.y / Tile_set);// The row under the top side of the object:
                value  = area.map.slice(limitColumn)[row * area.columns + column];// We get the tile value under the top left corner of the object:
        
                if (value != 0) this[value](object, column, row);// If it's not a walkable tile, we do narrow phase collision.
        
                column = Math.floor((object.x + object.width) / Tile_set);// The column under the right side of the object:
                value  = area.map.slice(limitColumn)[row * area.columns + column];// Value under the top right corner of the object.
        
                if (value != 0) this[value](object, column, row);
        
                /* TEST BOTTOM */
        
                column = Math.floor(object.x / Tile_set);// The column under the left side of the object:
                row    = Math.floor((object.y + object.height) / Tile_set);// The row under the bottom side of the object:
                value  = area.map.slice(limitColumn)[row * area.columns + column];
        
                if (value != 0) this[value](object, column, row);
        
                column = Math.floor((object.x + object.width) / Tile_set);// The column under the right side of the object:
                value  = area.map.slice(limitColumn)[row * area.columns + column];
        
                if (value != 0) this[value](object, column, row);
        
                /* TEST LEFT */
        
                column = Math.floor(object.x / Tile_set);// The column under the left side of the object:
                row    = Math.floor(object.y / Tile_set);// Top side row:
                value  = area.map.slice(limitColumn)[row * area.columns + column];
        
                if (value != 0) this[value](object, column, row);
        
                row = Math.floor((object.y + object.height) / Tile_set);// Bottom side row:
                value = area.map.slice(limitColumn)[row * area.columns + column];
        
                if (value != 0) this[value](object, column, row);
        
                /* TEST RIGHT */
        
                column = Math.floor((object.x + object.width) / Tile_set);// The column under the right side of the object:
                row    = Math.floor(object.y / Tile_set);// Top side row:
                value  = area.map.slice(limitColumn)[row * area.columns + column];
        
                if (value != 0) this[value](object, column, row);
        
                row = Math.floor((object.y + object.height) / Tile_set);// Bottom side row:
                value = area.map.slice(limitColumn)[row * area.columns + column];
        
                if (value != 0) this[value](object, column, row);

            },

            handleCollision2: function(object, object2) {

                var obj_column, obj_row, obj2_column, obj2_row, obj2_column2, obj2_row2, value;

                /* TEST TOP */

                obj_column = Math.floor(object.x / Tile_set);// The column under the left side of the object:
                obj_row    = Math.floor(object.y / Tile_set);// The row under the top side of the object:
                obj2_column = Math.floor(object2.x / Tile_set);// The column under the left side of the object:
                obj2_row    = Math.floor(object2.y / Tile_set);
                obj2_row2   = Math.floor((object2.y + object2.height) / Tile_set);// The row under the top side of the object:
                obj2_column2= Math.floor((object2.x + object2.width) / Tile_set);
                
                value  = 13;// We get the tile value under the top left corner of the object:
        
                this[value](object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2);// If it's not a walkable tile, we do narrow phase collision.
        
                obj_column = Math.floor((object.x + object.width) / Tile_set);// The column under the right side of the object:

                value  = 13;// Value under the top right corner of the object.
        
                this[value](object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2);
        
                /* TEST BOTTOM */
        
                obj_column = Math.floor(object.x / Tile_set);// The column under the left side of the object:
                obj_row    = Math.floor((object.y + object.height) / Tile_set);// The row under the bottom side of the object:
                
                value  = 13;
        
                this[value](object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2);
        
                obj_column = Math.floor((object.x + object.width) / Tile_set);// The column under the right side of the object:
                
                value  = 13;
        
                this[value](object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2);
        
                /* TEST LEFT */
        
                obj_column = Math.floor(object.x / Tile_set);// The column under the left side of the object:
                obj_row    = Math.floor(object.y / Tile_set);// Top side row:
                
                value  = 13;
        
                this[value](object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2);
        
                obj_row = Math.floor((object.y + object.height) / Tile_set);// Bottom side row:

                value = 13;
        
                this[value](object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2);
        
                /* TEST RIGHT */
        
                obj_column = Math.floor((object.x + object.width) / Tile_set);// The column under the right side of the object:
                obj_row    = Math.floor(object.y / Tile_set);// Top side row:

                value  = 13;
        
                this[value](object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2);
        
                obj_row = Math.floor((object.y + object.height) / Tile_set);// Bottom side row:

                value = 13;
        
                this[value](object, obj_column, obj_row, object2, obj2_column, obj2_row, obj2_column2, obj2_row2);

            }

        },

        loop: function(time_stamp) {

            if (controller.up && !game.player.jumping) {

                game.player.jumping = true;
                game.player.y_velocity = -40;

            }

            if (controller.left) {

                game.player.x_velocity -= 0.6;
                controller.type = "left";

            }

            if (controller.right) {

                game.player.x_velocity += 0.6;
                controller.type = "right";

            }

            game.player.x_old = game.player.x;
            game.player.y_old = game.player.y;

            game.player.y_velocity += 2.1;

            game.player.x += game.player.x_velocity;
            game.player.y += game.player.y_velocity;
            
            game.player.x_velocity *= 0.9;
            game.player.y_velocity *= 0.9;

            if (game.mob.stone.spon == true) {

                game.mob.stone.x_old = game.mob.stone.x;
                game.mob.stone.y_old = game.mob.stone.y;

                game.mob.stone.y_velocity += 2.1;

                game.mob.stone.x += game.mob.stone.x_velocity;
                game.mob.stone.y += game.mob.stone.y_velocity;

                game.mob.stone.y_velocity *= 0.9;
                // game.mob.stone.x_velocity *= 0.9;

                // console.log((game.mob.stone.y + game.mob.stone.height) / Tile_set );

                if (game.mob.stone.x + game.mob.stone.width >= Tile_set * 8) {

                    game.mob.stone.spon = false;

                }

                game.collider.handleCollision(game.mob.stone, game.area);
                game.collider.handleCollision2(game.player, game.mob.stone);

            }

            if (game.mob.bird.spon == true) {

                game.mob.bird.x_old = game.mob.bird.x;
                game.mob.bird.y_old = game.mob.bird.y;

                game.mob.bird.x += game.mob.bird.x_velocity;
                game.mob.bird.y += game.mob.bird.y_velocity;

                if (game.mob.bird.x + game.mob.bird.width >= Tile_set * 8) {

                    game.mob.bird.spon = false;

                }

                game.collider.handleCollision2(game.player, game.mob.bird);

            }

            if (game.mob.bird2.spon == true) {

                game.mob.bird2.x_old = game.mob.bird2.x;
                game.mob.bird2.y_old = game.mob.bird2.y;

                game.mob.bird2.x += game.mob.bird2.x_velocity;
                game.mob.bird2.y += game.mob.bird2.y_velocity;

                if (game.mob.bird2.x + game.mob.bird2.width >= Tile_set * 8) {

                    game.mob.bird2.spon = false;

                }

                game.collider.handleCollision2(game.player, game.mob.bird2);

            }

            if (game.player.y < 0) {

                game.player.y_velocity = 0;
                game.player.y = 0;

            } else if (game.player.y + game.player.height > display.butting.canvas.height) {

                game.player.jumping = false;
                game.player.y_velocity = 0;
                game.player.y = display.butting.canvas.height - game.player.height - 0.001;

            }

            if (game.player.x < 0) {

                game.player.x_velocity = 0;
                game.player.x = 0;

            } else if (game.player.x + game.player.width > display.butting.canvas.width) {

                game.player.x_velocity = 0;
                game.player.x = display.butting.canvas.width - game.player.width - 0.001;

            }

            game.collider.handleCollision(game.player, game.area);

            if (game.mob.stone.spon == true) {
                game.collider.handleCollision2(game.player, game.mob.stone);
            }

            if (game.mob.bird.spon == true) {
                game.collider.handleCollision2(game.player, game.mob.bird);
            }

            if (game.mob.bird2.spon == true) {
                game.collider.handleCollision2(game.player, game.mob.bird2);
            }

            display.render(game);

            if (time > -1) {

                if (limitColumn == 8*9) {

                    game.mob.stone.spon = true;

                }

                if (limitColumn == 0) {

                    game.mob.bird.spon = true;

                }

                if (limitColumn == 8*4) {

                    game.mob.bird2.spon = true;

                }
            
                if (game.player.y + game.player.height >= Tile_set * 7.8) {
                
                    var falldown = document.getElementById("falldown");

                    display.context.drawImage(falldown, 0, 0, 512, 512, -18, 0, 512, 512);

                    window.setTimeout(()=>{

                        limitColumn = y;
                        game.player.x = Tile_set * 4 - Tile_set * 0.5 + 2;
                        game.player.x_old = Tile_set * 4 - Tile_set * 0.5 + 2;
                        game.player.y = Tile_set * 6;
                        game.player.y_old = Tile_set * 7;

                        game.mob.stone.spon = false;
                        game.mob.stone.x = Tile_set * 3;
                        game.mob.stone.y = 0;
                        game.mob.stone.x_velocity = 2;

                        game.mob.bird.spon = false;
                        game.mob.bird.x = 0;
                        game.mob.bird.y = Tile_set * 2;

                        game.mob.bird2.spon = false;
                        game.mob.bird2.x = Tile_set * 8;
                        game.mob.bird2.y = Tile_set * 2;

                        window.requestAnimationFrame(game.loop);
    
                    }, 1000);

                } else {

                    window.requestAnimationFrame(game.loop);
                
                }

            } else {
                newPage('result.html');
            }

        }

    };

    function newPage(web, index)  {
        // window.location.href = index;
        window.location.href = web + "?index=" + index;
    }

    display.butting.canvas.height = Tile_set * 8;
    display.butting.canvas.width = Tile_set * 8;
    
    window.addEventListener("keydown", controller.keyUpDown);
    window.addEventListener("keyup", controller.keyUpDown);
    window.addEventListener("resize", display.resize);
    
    display.resize();

    game.loop();

    window.setInterval(() => {

        document.getElementById("timer").innerText = time;

        time -= 1;
        if (time == 0) {
    
            // var gameover = document.getElementById("gameover");
            // // var btn = document.getElementById("btn");
    
            // document.getElementById("timer").innerText = 0;
            // display.context.drawImage(gameover,0,0,512,128,Tile_set*0.1,display.butting.canvas.height*0.2,Tile_set*6.7,Tile_set*2);
    
            
            // btn.style.display = 'block';
        } else {

            window.clearInterval();

        }
        if (limitColumn <= 0) {
            limitColumn = 0;
        } else if (game.player.y <= display.butting.canvas.height * 0.45 && controller.up == false) {
            limitColumn -= 8;
        } 
    
    }, 1000);

}



start(117, 8*14);