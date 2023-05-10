$('#search-form').on('submit', function(event) {
  event.preventDefault();

  var query = $('#query').val();
  var apiKey = 'AIzaSyA6vAPP2oKyT3rJLHj3SE62RxgzD9PSObU';
  var apiUrl = 'https://factchecktools.googleapis.com/v1alpha1/claims:search';

  var params = {
    query: query,
    key: apiKey
  };

  $.get(apiUrl, params, function(response) {
    var results = response.claims;
    var html = '';

    if (results.length > 0) {
      $.each(results, function(index, result) {
        var source = result.claimReview[0].publisher.name;
        var rating = result.claimReview[0].textualRating || 'unknown';
        var colorClass = rating.toLowerCase() === 'false' ? 'false' : 'true';
        var imageUrl = result.claimReview[0].publisher.logoUrl;
        var description = result.claimReview[0].title;

        html += '<div class="card">';
        html += '<img src="' + imageUrl + '" alt="' + source + '">';
        html += '<div class="card-body">';
        html += '<h2 class="' + colorClass + '">' + rating + ' news - ' + source + '</h2>';
        html += '<p>' + description + '</p>';
        html += '<a href="' + result.claimReview[0].url + '">Read More</a>';
        html += '</div>';
        html += '</div>';
      });
    } else {
      html = '<p>No results found.</p>';
    }

    $('#results').html(html);
  });
});
