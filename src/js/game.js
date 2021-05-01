(function(){

	const $rowsNumber = $('#rows-number'),
		$columnsNumber = $('#columns-number'),
		$area = $('.game-area'),
		$loader = $('#loader');


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
	}

	draw()
	addHandlers()
})()
