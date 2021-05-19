window.sr = ScrollReveal();

sr.reveal('.search', {
    duration: 5000,
    origin: 'bottom',
    distance: 'left'
});

sr.reveal('.card-body', {
    duration: 5000,
    origin: 'bottom',
    distance: 'down'
});


sr.reveal('.superiorder', {
    duration: 5000,
    origin: 'bottom',
    distance: 'right'
});

sr.reveal('.logo', { 
    duration: 2000,
    rotate: {
        x: 1,
        y: 180,
    }
}) 


sr.reveal('#botoncel, #botonlap, #botoncam, #botontel, #botoncons, #botongames, #botonacce, #botonaudif', { 
    duration: 4000,
    rotate: {
        x: 1,
        y: 180,
    }
}) 