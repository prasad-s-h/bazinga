const rhymingWordsForm = document.querySelector('form');
const inputWord = document.querySelector('#word');
const score_from = document.querySelector('#score_from');
const score_to = document.querySelector('#score_to');
const placeDropDown = document.querySelector('#placeDropDown');
const dropdown_template = document.querySelector('#dropdown_template')
  .innerHTML;

rhymingWordsForm.addEventListener('submit', e => {
  e.preventDefault();

  fetch(`/getRhymingWordsAndCount?rel_rhy=${inputWord.value}`).then(
    response => {
      response.json().then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          let dropdownTemplateHTML;
          let new_data = {};
          if (score_from.value && score_to.value) {
            if (score_from.value > score_to.value) {
              alert(
                'score_from value should be lesser than or equal to score_to value'
              );
              return;
            }
            new_data.result = data.result.filter(ele => {
              if (
                ele.score >= score_from.value &&
                ele.score <= score_to.value
              ) {
                return ele;
              }
            });
            dropdownTemplateHTML = Mustache.render(dropdown_template, {
              result: new_data
            });
          }
          if (!score_from.value && !score_to.value) {
            dropdownTemplateHTML = Mustache.render(dropdown_template, {
              result: data
            });
          }
          if (
            (score_from.value && !score_to.value) ||
            (!score_from.value && score_to.value)
          ) {
            if (!score_to.value) {
              new_data.result = data.result.filter(ele => {
                if (ele.score >= score_from.value) {
                  return ele;
                }
              });
              dropdownTemplateHTML = Mustache.render(dropdown_template, {
                result: new_data
              });
            }
            if (!score_from.value) {
              new_data.result = data.result.filter(ele => {
                if (ele.score <= score_to.value) {
                  return ele;
                }
              });
              dropdownTemplateHTML = Mustache.render(dropdown_template, {
                result: new_data
              });
            }
          }
          placeDropDown.innerHTML = dropdownTemplateHTML;
        }
      });
    }
  );
});
