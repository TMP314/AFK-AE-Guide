
function saveDiv(divId) {
    
    const pdf = new jsPDF();

    pdf.addHTML($('#' + divId)[0], function () {
        pdf.save('Test.pdf');
    });
}

function genPDF() {
    let htmlString = document.getElementById("popup-guide-p2");
    {
        html2canvas(htmlString,{
        onrendered:function(canvas){

        var img=canvas.toDataURL("image/png");
        var doc = new jsPDF();
        doc.addImage(img,'JPEG',20,20);
        doc.save('test.pdf');
        doc.autoPrint();  // <<--------------------- !!
        doc.output('save', 'test.pdf');
    }

    });

  }
}

function printPDF2 (divId) {
    var doc = new jsPDF();
    doc.addHTML($('#' + divId)[0], 15, 15, {
        'background': '#fff',
        }, function() {
        doc.save('sample-file.pdf');
    });
}