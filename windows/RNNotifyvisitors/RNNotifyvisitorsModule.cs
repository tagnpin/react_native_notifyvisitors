using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Notifyvisitors.RNNotifyvisitors
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNNotifyvisitorsModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNNotifyvisitorsModule"/>.
        /// </summary>
        internal RNNotifyvisitorsModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNNotifyvisitors";
            }
        }
    }
}
