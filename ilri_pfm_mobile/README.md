# ilri_pfm

A new Flutter project.

## Getting Started

common_widgets - Common widgets/without logic
services
services
blocs
    - bloc_1
        - events
        - states
        - blocs
features
    - login_form
        - login_form_view
        - login_form_model
        - Other Sub Widgets
screens
    - login_screen
        - feature_1
        - feature_2

on DioError catch (e) {
        if (e.response != null) {
          print(e.response?.data);
          print(e.response?.headers);
          print(e.response?.requestOptions);
        } else {
          // Something happened in setting up or sending the request that triggered an Error
          print(e.requestOptions);
          print(e.message);
        }
        _errorMessage();
      }