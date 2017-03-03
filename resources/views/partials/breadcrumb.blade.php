{{$url = ""}}
<div class="container-fluid" style="background-color: white;">
    <div class="container breadcrumb_container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="{{URL::to('/')}}">Home</a></li>
          @for ($i = 1 ; $i <= count(Request::segments()); $i++)
          	@php 
              $text = explode('_', Request::segment($i));
            @endphp 
          	@if ($i === count(Request::segments()))
          		@if(isset($data))<li class="breadcrumb-item active" style="text-transform: uppercase;">{{$data->title}}</li> 
              @elseif(isset($author))<li class="breadcrumb-item active" style="text-transform: capitalize;">{{$author}}'s Comment</li> 
          		@else
          		<li class="breadcrumb-item active" style="text-transform: capitalize;">{{implode(' ', $text)}}</li>
          		@endif
          	@else
              @if(isset($reply) && $i ===3 ) 
              @else
                @php $url = $url . '/' . Request::segment($i); @endphp
          		  <li class="breadcrumb-item" style="text-transform: capitalize;"><a href="{{URL::to($url)}}">{{implode(' ', $text)}}</a></li>
              @endif
          	@endif
          @endfor
        </ol>
    </div>
</div>
