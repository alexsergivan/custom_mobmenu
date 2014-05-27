(function ($) {	
  Drupal.behaviors.custom_mobmenu = {
    attach: function (context, settings) { 

    // trigger element
    trigger_menu = $('.dl-trigger, .menu_close');    
    mob_menu_wrap = $('#mob_menu_wrap');
    mob_menu_header = $('.menu_header');
    
    //select main ul
    mob_menu = $(Drupal.settings.custom_mobmenu.menu_block, mob_menu_wrap);
    main_ul = $('>ul', mob_menu);
    $('ul', main_ul).hide();
    mob_menu.hide();
    
    
    //add some styles
    bg_color = Drupal.settings.custom_mobmenu.config.bg_color;
    header_bg_color = Drupal.settings.custom_mobmenu.config.header_bg_color;
    text_color = Drupal.settings.custom_mobmenu.config.text_color;
    border_color = Drupal.settings.custom_mobmenu.config.border_color;
    
    mob_menu.css('z-index', '9999');
    mob_menu.css('width', '100%');
    mob_menu.css('background', bg_color);
    $('.menu_close').css('color', bg_color);
    $('a', mob_menu).css('color', text_color);
    $('ul', mob_menu).css('background', bg_color);
    $('ul li', mob_menu_wrap).css('border-color', border_color);
    mob_menu_header.css('background', header_bg_color);
    mob_menu_header.css('color', text_color);
    wind_width = $(window).width();
    
       
   level = 0;  
   main_ul.attr('level', level);
   $('>li', main_ul).each(function(index){
     cur_li = $(this);
     $('ul', cur_li).each(function(index2) {
       level++; 
       $(this).attr('level', level);
            	
     }); 
     level++;  	
   });
   
   
   $('li.expanded', main_ul).each(function(i){
     this_li = $(this);
     if($('>ul', this_li).length) {
       this_li.prepend('<span class="expand">▼</span>');	
     }	
   });
  
   $('.expand').css('color', header_bg_color);
   $('.expand').css('cursor', 'pointer');
        
     
    // show/hide menu after click on trigger 
    trigger_menu.on('click', function() {
      mob_menu_header.slideToggle("fast");	
      mob_menu.slideToggle("fast", function() {
        if (mob_menu.css('display') == 'block') {
          mob_menu.css('overflow', 'visible');  	
        } 
        else {
          mob_menu.css('overflow', 'hidden');	
        } 
      });
      	
    });       
    
    //show next level after menu click       
    $('a', mob_menu).on('click', function(){
     	
    }); 
    
    $('.expand', mob_menu).on('click', function(){
      exp = $(this);	
      parent_li = $(this).parent(); 
      $('>ul', parent_li).css('opacity', 0);	
      $('>ul', parent_li).slideToggle("fast", function() {
        $('>ul', parent_li).css('opacity', 1);
        if ($('>ul', parent_li).is(":visible")) {
          exp.html('▲');
          exp.addClass('opened');	
        }
        if ($('>ul', parent_li).is(":hidden")) {
          exp.html('▼');
          exp.removeClass('opened');	
        }
      });
      
    }); 
     
          
      //add title to menu header
      function add_title_to_menu_header(title, header, level) {
      
        header.html(title);	
        header.attr('level', level);
       
      }
      
      function menu_go_to_level(from_level, to_level) { 
        from_level = parseInt(from_level);
        to_level = parseInt(to_level);
        wind_width = $(window).width();	        
        $('ul[level=' + from_level + ']').animate({
          left : wind_width + 'px'
        }, 250, 'linear', function() {
        
          $('ul[level=' + from_level + ']').animate({
            left : 0 + 'px'
          }, 250, 'linear', function() {
          	$('li', main_ul).hide();    
          	$('>a', $('ul[level=' + to_level + '] > li').parents('li')).hide();
          	     	
            $('ul[level=' + to_level + ']').show();
            $('ul[level=' + to_level + '] > li').parents('li').show();
            $('ul[level=' + to_level + '] > li').show();    
            $('ul[level=' + to_level + '] > li a').show();  
            global_current = to_level;
            
          });  
          
        });	
      }

    }
  }

})(jQuery);
