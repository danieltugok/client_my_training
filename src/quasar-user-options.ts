import quasarLang from 'quasar/lang/pt-BR'
import quasarIconSet from 'quasar/icon-set/material-symbols-rounded'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// ..required because of selected iconSet:
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'

//A few examples for animations from Animate.css:
import '@quasar/extras/animate/fadeIn.css'
import '@quasar/extras/animate/fadeOut.css'

import { AddressbarColor, Loading, QSpinnerDots, Notify, Dialog } from 'quasar'

// Import Quasar css
import 'quasar/src/css/index.sass'
import '@/styles/quasar-custom.sass'

export default {
  plugins: { AddressbarColor, Loading, Notify, Dialog },
  config: {
    loading: {
      spinner: QSpinnerDots,
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'white'
    }
  },
  lang: quasarLang,
  iconSet: quasarIconSet
}
