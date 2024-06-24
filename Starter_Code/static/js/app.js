
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

let url_json = d3.json(url)

// Build the metadata panel
function buildMetadata(sample) {
  d3.json(url).then((meta) => {
        
    // get the metadata field 
    let meta_field = meta.metadata
    console.log(meta_field)
    // Filter the metadata for the object with the desired sample number
    
    // Use d3 to select the panel with id of `#sample-metadata`
    let meta_samp = d3.select('#sample_metadata')
    // Use `.html("") to clear any existing metadata
    


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

     // Use d3 to select the dropdown with id of `#selDataset`
     let dropdown = d3.select('#selDataset')
     let name1 = meta.names
     name1.map(name_id => { 
       dropdown.append('option').text(name_id).property('names')
     })

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json(url).then((data) => {
    
    
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Don't forget to slice and reverse the input data appropriately

    let sv1 = data.samples[0].sample_values.slice(0,10).reverse()
    let otu = data.samples[0].otu_ids.slice(0,10).reverse()
    // let otu_label = data.samples[0].otu_labels
    let id = otu.map((x) => "OTU"+ x + " " )
    
    let bar_layout = {title: "Top 10 Bacteria Cultures Found"}

    // Build a Bar Chart
    let bar = [{
      type: 'bar',
      x: sv1,
      y: id,
      orientation: 'h',
      
    }];

    // Render the Bar Chart
    Plotly.newPlot('bar', bar, bar_layout);
    
    // Get the samples field
    // let sv2 = data.samples[150].sample_values
    // let otu2 = data.sample[150].otu_ids
   
    

    // Build a Bubble Chart
    let trace1 = {
      x: otu,
      y: sv1,
      mode: 'markers',
      marker: {
        color: otu,
        size: sv1
      }
    };
    
    let bubble = [trace1];
    
    let layout = {
      title: 'Bacteria Cultures per Sample',
      showlegend: false,
      height: 600,
      width: 600
    };  
    
    

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubble, layout);

    
       
  
     

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
    
  
  });
}
 
// Function to run on page load
function init() {
  buildCharts(),
  buildMetadata()

    // Get the names field
  
   
    
    
    
    
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    let selectedData = dropdown.property('values')
    
    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

    
}


// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
// Plotly.restyle('bubble', 'values', [newdata])
}

// Initialize the dashboard
init();
