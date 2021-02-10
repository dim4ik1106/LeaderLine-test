function addLine (start, end, options) {
    let line = new LeaderLine(start, end, options)
    return line
}

function addBlocks(count, bonusClass) {
    let cont = $('#blocks-cont')
    let addedBlocks = []
    for (let i = 0; i < count; i++) {
        let block1 = $('<div class="block ' + bonusClass + '" data-inst="start"></div>')
        let block2 = $('<div class="block ' + bonusClass + '" data-inst="end"></div>')
        addedBlocks.push(block1)
        addedBlocks.push(block2)
        cont.append(block1)
        cont.append(block2)
        let line = addLine(block1[0], block2[0], {
            color: '#ff0000',
            size: 2,
            endPlug: 'arrow2',
            endPlugSize: 1.5,
            outlineMax: 2.5
        })
        lines = [line]
        $(block1).data('lines', lines)
        $(block2).data('lines', lines)
    }
    randomizePositions($(addedBlocks))
    $(addedBlocks).draggable({
        containment: 'window',
        scroll: false,
        drag: function (e, ui) {
            let $this = $(e.target)
            let lines = $this.data('lines')
            lines.forEach(line => {
                line.position()
            });
        }
    })
}
function removeBlocks(count) {
    $('.block:lt('+count+')').each(function (i) {
        let $this = $(this)
        let lines = $this.data('lines')
        lines.forEach(line => {
            try {
                line.remove()
            } catch (err) {}
        });
        $this.remove()
    });
}
let blockCount = 10;
addBlocks(blockCount);



function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function randomizePositions(blocks) {
    let pack = $('.block')
    if (blocks != undefined) pack = blocks;
    pack.each(function (i) {
        let $this = $(this)
        // console.log($this);
        $this.css({
            top: randomInteger(0, window.innerHeight - 30),
            left: randomInteger(0, window.innerWidth - 100)
        })
        let lines = $this.data('lines')
        lines.forEach(line => {
            line.position()
        });
    })
}
randomizePositions()

$('.btn:not(input)').click(function (e) {
    let $this = $(this)
    if ($this.hasClass('addBlock')) {
        addBlocks($('.pack-size').val())
    }
    if ($this.hasClass('removeBlock')) {
        removeBlocks($('.pack-size').val())
    }
    if ($this.hasClass('randomize')) {
        randomizePositions()
    }
})