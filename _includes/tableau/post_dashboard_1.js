    /**
     * Instantiate our vizualization.
     */

     $(function() {
       var url  = 'https://public.tableau.com/views/TrafficViolationsinMaryland/Question?/Splash'
       var size = findDashboardSize();
       var vizOptions = {
         showShareOptions	  : true,
         showTabs           : true,
         // hideTabs           : true,
         hideToolbar        : true,
         width              : size.width + 'px',
         height             : size.height + 'px',
         onFirstInteractive : function (e) {
           $('#viz iframe').attr('scrolling', 'no');
           // $('#viz iframe').css('overflowx', 'visible');
           // $('#viz iframe').css('overflowy', 'visible');
           $('#viz iframe').width(size.width);
           $('#viz iframe').height(size.height + 20);
         }
       };
       var viz = new tableauSoftware.Viz(document.getElementById('viz'), url, vizOptions);
       viz.addEventListener(tableau.TableauEventName.TAB_SWITCH, function resize_again() {
           console.log('again')
           var size = findDashboardSize();
           $('#viz iframe').attr('scrolling', 'no');
           // $('#viz iframe').css('overflowx', 'visible');
           // $('#viz iframe').css('overflowy', 'visible');
           $('#viz iframe').width(size.width);
           $('#viz iframe').height(size.height + 20);
           });
     });

     /**
      * Finds the correct size of the dashboard in this screen.
      */
     function findDashboardSize() {
       var minHeight = 600;
       var maxHeight = 885;
       var minWidth  = 1000;

       // The minus 100px leaves us room for the header/footer. Adjust as needed.
       var height = $('body').height() - 100;

       if (height < minHeight) {
         height = minHeight;
       }
       if (height > maxHeight) {
         height = maxHeight;
       }

       var width = Math.round(height/(minHeight/minWidth));
       return {
         'width'  : width,
         'height' : height
       }
     }

     /**
      * Resizes our viz.
      */
     function resize() {
       var size = findDashboardSize();
       $('#viz iframe').attr('scrolling', 'no');
       // $('#viz iframe').css('overflowx', 'visible');
       // $('#viz iframe').css('overflowy', 'visible');
       $('#viz iframe').width(size.width);
       $('#viz iframe').height(size.height + 20);
     }

     /**
      * Hook into the window resize event to resize when the user resizes the screen.
      */
     $(window).resize(resize);
