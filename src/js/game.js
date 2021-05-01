(function(){

	const $rowsNumber = $('#rows-number'),
		$columnsNumber = $('#columns-number'),
		$area = $('.game-area'),
		$loader = $('#loader'),
		$start = $('#btn-start');


	const draw = () => {
		const nr = parseFloat($rowsNumber.val()),
			nc = parseFloat($columnsNumber.val()),
			side = measureSide(nr, nc)
	
		$area.empty()
		let html = ''

		for (let row = 0; row < nr; row++) {
			html += `<div id="row-${row}" class="game-row">`
			for (let col = 1; col < nc; col++) {
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
	}

	const startGame = () => {
		$loader.show()
		drawBombs()
		addGameCellsHandler()
		$loader.hide()
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
			$cell.css('background-color', 'yellow')
		}
	}
	
	const addGameCellsHandler = () => {
		$('.game-cell').on('click', (e) => {
			if($(e.target).data('bomb') === true) {
				// TODO - End Game
			} else {
				// TODO - Open cells and calculate numbers
			}
		})
	}

	draw()
	addHandlers()
})()
