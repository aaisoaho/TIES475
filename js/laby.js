// Alustetaan peli
var config = {
    type: Phaser.AUTO,
    width: 700,
    height: 800,
    physics: {
        default: 'arcade'
    },
    scene: { // Emme tarvitse kuin yhden skenen, jossa tarvitaan preload, create ja update funktioita
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

let huone = [
    0,0,0,0,0,0,0,
    0,0,0,3,0,0,0,
    0,0,0,1,0,0,0,
    0,1,1,1,1,1,0,
    0,1,0,0,0,1,0,
    0,1,0,0,0,1,0,
    2,1,0,0,0,1,2,
    0,0,0,0,0,0,0
];

// function reset ()
// ------------------------------------------------------------------
//  
function reset () 
{

}

//  function preload ()
// ------------------------------------------------------------------
//  Ladataan assetit.
function preload ()
{
    this.load.image('bg', 'assets/bg.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.image('goal', 'assets/goal.png');
    this.load.image('cursor','assets/cursor.png');
}

//  function create ()
// ------------------------------------------------------------------
//  Sceneä luodessa ajettava funktio
function create ()
{
    this.add.image(350,350,'bg');
    let seinat = [];
    let maalit = [];
    let pallo;
    for (let i = 0; i < 8; i++) {
        for (let j=0; j < 7; j++) {
            switch(huone[j+7*i]) {
                case 0:
                    let seina = this.physics.add.sprite(100*j+50,100*i+50,'wall');
                    seina.body.immovable = true;
                    seinat.push(seina);
                    break;
                case 2:
                    maalit.push(this.physics.add.sprite(100*j+50,100*i+50,'goal'));
                    break;
                case 3: 
                    pallo = this.physics.add.sprite(100*j+50,100*i+50,'ball');
                    break;
                default:
                    break;
            }
        }
    }
    let cursor = this.add.image(0,0,'cursor').setVisible(false);

    this.input.on('pointermove', function (pointer)
    {
        cursor.setVisible(true).setPosition(pointer.x, pointer.y);

        this.physics.moveToObject(pallo, pointer, 600);
    }, this);
    seinat.forEach(seina => 
    {
        this.physics.add.collider(pallo,seina,osuSeinaan,null,this);
    });
}

function lisaaCollider(seina) {
    this.physics.add.collider(pallo,seina,osuSeinaan,null,this);
}

//  function update ()
// ------------------------------------------------------------------
//  Päivitysfunktio. Täällä tapahtuu kaikki 
//  muutokset pelin tilanteeseen.
function update () 
{

}

function osuSeinaan(pallo,seina)
{
    if (pallo.body.touching.left || pallo.body.touching.right) 
    {
        pallo.setVelocityX(0);
    }
    if (pallo.body.touching.top || pallo.body.touching.bottom)
    {
        pallo.setVelocityY(0);
    }
}
