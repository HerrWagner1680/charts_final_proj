
// courtesy of
// Riccardo Govoni (aka battlehorse)
// Project "Demo script to convert Google Chart Tools charts into PNG images."
// https://gist.github.com/battlehorse/1333906
// EXAMPLE
// HAVE NAME BE A HIDDEN LINK THAT GOES TO PAGE AND DEMO LINK

//WORKING VERSION
// http://bl.ocks.org/nverba/raw/5411684/

      function getImgData(chartContainer) {
        // var chartArea = chartContainer.getElementsByTagName('div')[0]
                  // contentDocument.getElementById('chartArea');
        var chartArea = chartContainer.getElementsByTagName('svg')[0].parentNode;

        var svg = chartArea.innerHTML;
        var doc = chartContainer.ownerDocument;
        var canvas = doc.createElement('canvas');
        canvas.setAttribute('width', chartArea.offsetWidth);
        canvas.setAttribute('height', chartArea.offsetHeight);
        
        
        canvas.setAttribute(
            'style',
            'position: absolute; ' +
            'top: ' + (-chartArea.offsetHeight * 2) + 'px;' +
            'left: ' + (-chartArea.offsetWidth * 2) + 'px;');
        doc.body.appendChild(canvas);
        canvg(canvas, svg);
        var imgData = canvas.toDataURL("image/png");
        canvas.parentNode.removeChild(canvas);
        return imgData;
      }
      
      function saveAsImg(chartContainer) {
        var imgData = getImgData(chartContainer);
        
        // Replacing the mime-type will force the browser to trigger a download
        // rather than displaying the image in the browser window.
        window.location = imgData.replace("image/png", "image/octet-stream");
      }
      
      function toImg(chartContainer, imgContainer) { 
        var doc = chartContainer.ownerDocument;
        var img = doc.createElement('img');
        img.src = getImgData(chartContainer);
        
        while (imgContainer.firstChild) {
          imgContainer.removeChild(imgContainer.firstChild);
        }
        imgContainer.appendChild(img);
      }

// courtesy of
// Riccardo Govoni (aka battlehorse)
// Project "Demo script to convert Google Chart Tools charts into PNG images."
// https://gist.github.com/battlehorse/1333906
// EXAMPLE
// HAVE NAME BE A HIDDEN LINK THAT GOES TO PAGE AND DEMO LINK