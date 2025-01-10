# 笔记 - Android


&lt;!--more--&gt;

## 一些常识

**STR**（Suspend to RAM）待机是一种电源管理技术，用于在设备（如计算机、智能手机或平板电脑）不使用时节省电能。在这种模式下，系统的状态被保存在RAM（随机存取存储器）中，而大部分硬件组件被置于低功耗状态。以下是关于STR待机的一些详细信息：

### STR待机的特点

1. **快速恢复**：
   - 当设备从STR待机状态唤醒时，系统状态从RAM中恢复，因此恢复速度非常快，通常只需几秒钟。
2. **低功耗**：
   - 在STR待机模式下，设备的大部分硬件组件被关闭或置于低功耗状态，从而显著降低功耗。这使得设备在待机状态下可以保持较长时间而不消耗太多电池电量。
3. **状态保存**：
   - 系统的当前状态（包括运行的应用程序、打开的文件等）被保存在RAM中。这意味着当设备从待机状态唤醒时，用户可以立即继续之前的工作，而无需重新启动系统或应用程序。

### STR待机的工作原理

1. **进入待机**：
   - 当用户触发待机操作（例如，通过关闭屏幕或按下电源按钮）时，系统开始将当前状态保存到RAM中。
   - 系统关闭或降低大部分硬件组件的电源，包括CPU、GPU、硬盘等，但保持RAM的电源供应，以保存系统状态。
2. **唤醒设备**：
   - 当用户通过特定的操作（例如，按下电源按钮或打开屏幕）唤醒设备时，系统从RAM中恢复保存的状态。
   - 硬件组件被重新激活，系统恢复到待机前的状态，用户可以立即继续使用设备。

### STR待机与休眠模式的区别

- 休眠模式（Suspend to Disk）

  ：

  - 在休眠模式下，系统的状态被保存到硬盘上，而不是RAM中。这意味着即使在完全断电的情况下，系统状态也不会丢失。
  - 休眠模式的恢复速度比STR待机慢，因为需要从硬盘读取系统状态，通常需要几十秒到几分钟不等。
  - 休眠模式的功耗更低，因为设备在休眠状态下可以完全断电，适合长时间不使用设备的情况。

### 示例：在Android设备中实现STR待机

在Android设备中，STR待机通常通过系统设置中的电源管理选项实现。以下是一个简单的示例，展示如何在Android应用中请求设备进入待机状态：



```java
import android.content.Context;
import android.os.PowerManager;

public class PowerManagerHelper {

    public static void goToSleep(Context context) {
        PowerManager powerManager = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        if (powerManager != null) {
            powerManager.goToSleep(PowerManager.GO_TO_SLEEP_REASON_POWER_BUTTON);
        }
    }
}
```

### 注意事项

- **权限**：请求设备进入待机状态可能需要特定的权限，具体取决于设备的制造商和Android版本。
- **用户交互**：通常，用户通过物理按钮（如电源按钮）触发待机操作，而不是通过应用直接请求待机。
- **系统兼容性**：不同的设备和操作系统版本可能对电源管理有不同的实现和限制，需要进行充分的测试以确保兼容性。






























---

> 作者: [扳布](https://6am600.github.io)  
> URL: https://6am600.github.io/posts/%E7%AC%94%E8%AE%B0/  

