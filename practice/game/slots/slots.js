$('.slot').jSlots({
    spinner : '#playNormal',
    number : 1
});
        // normal example

        // $.jSlots.defaultOptions = {   
        //     number : 3,          // Number: number of slots   
        //     winnerNumber : 1,    // Number or Array: list item number(s) upon which to trigger a win, 1-based index, NOT ZERO-BASED   
        //     spinner : '',        // CSS Selector: element to bind the start event to   
        //     spinEvent : 'click', // String: event to start slots on this event   
        //     onStart : $.noop,    // Function: runs on spin start,   
        //     onEnd : $.noop,      // Function: run on spin end. It is passed (finalNumbers:Array). finalNumbers gives the index of the li each slot stopped on in order.   
        //     onWin : $.noop,      // Function: run on winning number. It is passed (winCount:Number, winners:Array, finalNumbers:Array)   
        //     easing : 'swing',    // String: easing type for final spin. I recommend the easing plugin and easeOutSine, or an easeOut of your choice.   
        //     time : 7000,         // Number: total time of spin animation   
        //     loops : 6            // Number: times it will spin during the animation   
        // }; 

$(document).on("click", "#playNormal", function(){
    let name = $("#name").val();
    let color = $(".color").text();
    let shape = $(".shape").text();
    let location = $(".location").text();
    console.log(name);
    console.log(color);
    console.log(shape);
    console.log(location);
})