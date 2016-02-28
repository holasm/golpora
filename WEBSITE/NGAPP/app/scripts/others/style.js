// 'use strict';
// // Wrap everything in an IIFE
// (function($, viewport){
//     window.progressBarWrapper = $('.progress-bar-wrapper');
//     var progressBarBackground = $('.progress-bar-background');
//     var currentProgress = $('.current-progress');

//     // Executes only in XS breakpoint
//     if( viewport.is('xs') ) {
//         // ...
//     }

//     // Executes in SM, MD and LG breakpoints
//     if( viewport.is('>=sm') ) {
//         // ...
//     }

//     // Executes in XS and SM breakpoints
//     if( viewport.is('<md') ) {
//         // ...
//     }

//     // Execute only after document has fully loaded
//     $(document).ready(function() {
//         if( viewport.is('xs') ) {
//             // ...
//         }
//     });

//     // Execute code each time window size changes
//     $(window).resize(
//         viewport.changed(function(){
//             if( viewport.is('xs') ) {
//                 console.log('xs');
//             }

//             if( viewport.is('sm') ) {
//                 var progressBarWrapperWidth = progressBarWrapper.width();
//                 var currentProgressWidth  = currentProgress.width();
//                 console.log(progressBarWrapper);
//             }
//         })
//     );

// })(jQuery, ResponsiveBootstrapToolkit);