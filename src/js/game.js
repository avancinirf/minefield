(function(){

	const $rowsNumber = $('#rows-number'),
		$columnsNumber = $('#columns-number'),
		$area = $('.game-area'),
		$loader = $('#loader'),
		$start = $('#btn-start'),
		$restart = $('#btn-restart');


	const draw = () => {
		const nr = parseFloat($rowsNumber.val()),
			nc = parseFloat($columnsNumber.val()),
			side = measureSide(nr, nc)
	
		$area.empty()
		let html = ''

		for (let row = 1; row < (nr+1); row++) {
			html += `<div id="row-${row}" class="game-row">`
			for (let col = 1; col < (nc+1); col++) {
				html += `<div id="cell-${row}-${col}" class="game-cell" style="height: ${side}px; width: ${side}px;"></div>`
			}
			html += '</div>'
		}
		$area.append(html)
	}

	const redraw = ($element, value) => {
		if (value < 10 || value > 50) return
		if (value) $element.val(value)
		draw()
	}

	const measureSide = (nr, nc) => {
		const w = ($area.width() - (nc+1))/nc;
		const h = ($area.height() - (nr+1))/nr;
		return h < w ? h : w
	}

	const addHandlers = () => {
		$('#rows-up').on('click', () => {
			redraw($rowsNumber, parseInt($rowsNumber.val()) +1)
		})
		$('#rows-down').on('click', () => {
			redraw($rowsNumber, parseInt($rowsNumber.val()) -1)
		})
		$('#columns-up').on('click', () => {
			redraw($columnsNumber, parseInt($columnsNumber.val()) +1)
		})
		$('#columns-down').on('click', () => {
			redraw($columnsNumber, parseInt($columnsNumber.val()) -1)
		})
		$start.on('click', () => startGame())
		$restart.on('click', () => restartGame())
	}

	const startGame = () => {
		$loader.show()
		drawBombs()
		addGameCellsHandler()
		$start.hide()
		$restart.show()
		$loader.hide()
	}

	const restartGame = () => {
		init()
		$('#img-smiley-happy').hide()
		$('#img-smiley-sad').show()
		startGame()
	}

	const drawBombs = () => {
		const nr = parseFloat($rowsNumber.val()),
			nc = parseFloat($columnsNumber.val())
		const bombs = parseInt(0.1 * (nr * nc))
		for (let b = 0; b < bombs; b++) {
			const r = parseInt(Math.random() * (nr - 0) + 0)
			const c = parseInt(Math.random() * (nc - 0) + 0)
			const $cell = $(`#cell-${r}-${c}`)
			const cellInfo = $cell.data()
			if (cellInfo?.bomb) {
				b--
				continue
			}
			$cell.data('bomb', true)
		}
	}
	
	const addGameCellsHandler = () => {
		$('.game-cell').on('click', (e) => {
			const $e = $(e.target)
			if($e.data('bomb') === true) {
				endGame($e)
			} else {
				analizeCell($e)
			}
		})
	}

	const analizeCell = ($e) => {
		const neighboringCells = []
		let [, row, col] = $e.attr('id').split('-')
		row = parseInt(row)
		col = parseInt(col)
		let number = 0
		for (let r = (row-1); r < (row + 2); r++) {
			for (let c = (col-1); c < (col + 2); c++) {
				const $cell = $(`#cell-${r}-${c}`)
				if ((!$cell.length) || 
				(row === r && col === c)) continue
				if ($cell.data('bomb') === true) number++
				if (!$cell.hasClass('empty') && !$cell.hasClass('number')) neighboringCells.push($cell)
			}
		}
		
		if (number !== 0) {
			$e.css('background-image', `url('./src/img/${number}.svg')`)
			$e.addClass('number')
		} else if(!$e.hasClass('empty')) {
			$e.addClass('empty')
			neighboringCells.forEach($el => {
				if(!$el.hasClass('empty')) {
					analizeCell($el)
				}
			})
		}		
	}

	const endGame = ($e) => {
		$e.addClass('explosion')
		$('#img-smiley-happy').hide()
		$('#img-smiley-sad').show()
		// TODO - Show all bombs and disable cells
	}

	const init = () => {
		draw()
		addHandlers()
	}

	init()
	
})()
