
var HangarXPLOR = HangarXPLOR || {};

// Render a toggle that sets the value of an element
HangarXPLOR.Pager = function(options, width, className, callback)
{
  width = width || '150px';
  className = className || 'js-custom-pager';
  
  console.log('Rendering Pagination', HangarXPLOR._totalRecords, HangarXPLOR._pageNo, HangarXPLOR._pageCount, className);
  
  var $control = $('<div class="options-selector pager-wrapper ' + className + '" />');
  var $pager = $('<div class="pager clearfix js-pager" />');
  var $left = $('<div class="left" />');
  var $right = $('<div class="right" />');
  var maxButtons = 5;
  
  $control.append($pager);
  $pager.append($left, $right);
  
  HangarXPLOR.RefreshPager = function() {
  
    var maxPages = Math.ceil(HangarXPLOR._totalRecords / HangarXPLOR._pageCount);
    if (HangarXPLOR._pageNo > maxPages) HangarXPLOR._pageNo = maxPages;
    
    var firstPage = Math.max(1, Math.min(Math.max(1, maxPages - maxButtons), HangarXPLOR._pageNo - Math.floor(maxButtons / 2)));
    if (HangarXPLOR._pageNo == maxPages) firstPage = Math.max(1, maxPages - maxButtons);
    
    $right.empty();
    
    if (maxPages == 1) {
      $left.addClass('mr0');
      return;
    } else {
      $left.removeClass('mr0');
    }
    
    for (var i = firstPage, j = Math.min(firstPage + maxButtons - 1, maxPages); i <= j; i++)
      $right.append('<a class="trans-02s trans-color' + ((i == HangarXPLOR._pageNo) ? ' active' : '') + '" rel="' + i + '">' + i + '</a>');
    var $buttons = $('a', $right);
    
    $buttons.bind('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      var $this = $(this);
      
      var newPage = $this.attr('rel');
      
      if (newPage != HangarXPLOR._pageNo) {
        HangarXPLOR._pageNo = newPage;
        $.cookie('HangarXPLOR._pageNo', HangarXPLOR._pageNo);
        
        if (typeof callback === 'function') callback.call(this, e, HangarXPLOR._pageNo);
        
        HangarXPLOR.RefreshPager();
      }
    });
    
  };
  
  HangarXPLOR.RefreshPager();
  
  $left.append(HangarXPLOR.Dropdown(options, width, className, function(e, pageCount) {
    HangarXPLOR._pageNo = 1;
    HangarXPLOR._pageCount = pageCount;
    $.cookie('HangarXPLOR._pageCount', HangarXPLOR._pageCount);
    
    HangarXPLOR.RefreshPager();
    
    if (typeof callback === 'function') callback.call(this, e, HangarXPLOR._pageNo);
  }));
  
  return $control;
}